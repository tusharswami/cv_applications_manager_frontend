import {useState, useEffect} from 'react';
import {getFilteredApplications, markAsResolvedAction, submitNewCommentAction, getAllAgentsAction, updateConcernedAgentAction} from '../../actions/applicationsBackend';
import {getCookie, isAuth} from '../../actions/auth';
import {sendSMS} from '../../actions/sms'
import moment from 'moment';
import Link from 'next/link';
import CommentBox from './comment/CommentBox'
import { useRouter } from 'next/router';
const GetAllApplicationsCards = () => {
	const router = useRouter()
    const [values, setValues] = useState({
		complaints : [],
		applications : [],
		isDataModified : false,
		isCommentBoxActive : false,
		openComment : '',
		newComment : '',
		isDataInvalidated : true,
		isAgentEditVisible : false,
		isFetching : false,
		searchTerm : '',
		complaintsSorted : [],
		editKey : ''
    })

    const [filters, setFilters] = useState({
        complaintId : '',
        isActive : '',
        status : 'unresolved',
        priority : '',
        phone : '',
        email : '',
        concernedAgent : ''
	})

	const [agents, setAgents] = useState([]);
	const token = getCookie('token');
	let {complaints, applications, isDataModified, isCommentBoxActive, openComment, newComment, isDataInvalidated,complaintsSorted, isAgentEditVisible, isFetching, searchTerm, editKey} = values;
	let {complaintId, isActive, status, priority, phone, email, concernedAgent} = filters;
    useEffect(()=> {
		init();
		// getAllAgents();
    }, [filters, isDataModified, isCommentBoxActive, isDataInvalidated]);

    const init = () => {
		setValues({ ...values, isFetching : true });
		getFilteredApplications({})
		.then(data => {
			console.log(data);
			setValues({...values, applications : data, isFetching : false})
		})
		.catch(error => {
			console.log(error);
			setValues({ ...values, isFetching : false })
		})
	}
	
	const handleStatus = (e) => {
		if(e.target.value === 'all'){
			setFilters({...filters, status : ''})
		}else{
			// console.log(e.target.value)
			setFilters({...filters, status : e.target.value})
		}
		renderComplaints()
	}

	const openCommentBox = (commentComplaintId) => {
		console.log("Open Comment Box");
		setValues({ ...values, isCommentBoxActive : !isCommentBoxActive, openComment: commentComplaintId})
	}

	const handleNewComment = (name, commentComplaintId) => e => {
		console.log(name, ' ', commentComplaintId)
		if(name === 'newComment'){
			setValues({...values, newComment : e.target.value})
		}else if(name === 'submitNewComment'){
			submitNewCommentAction({complaintId : commentComplaintId, isAgent : true, commentBy : "Tushar", body: newComment}).then(data => {
				if(data.status != 200){
					console.log("Problem adding a new Comment");
					console.log(data.err)
				}else{
					console.log(data)
					setValues({...values, newComment : ''})
				}
			})
		}
	}

	const renderComplaints = () => {
		if(applications.length === 0){
			return (
				<div >
					<h2 className="text-center"> No Applications Found</h2>
				</div>
			)
		}
		return applications.map((application, index)=> {
				return (
					<div className="strip_list wow fadeIn" style={{padding: "10px 25px 10px 25px", marginBottom : "1px"}} key={application._id}>
						{/* <a onClick={() => {sendContactInfo(complaint.name, complaint.phone, complaint.subject)}} className="wish_bt" title="Get Contact Info" ></a> */}
						<div className="row">
						<div className="col-lg-1">
							<small><small>{moment(application.createdAt).fromNow()}</small></small>
                        </div>
                        <div className="col-lg-4">
                        <small style={{color : "#000"}}>{application.email}</small>
                        </div>
                        <div className="col-lg-3">
						<small style={{color : "#000"}}>{application.name}</small>
                        <small style={{cursor: "pointer"}}>{application.mobile}</small>
                        <small style={{textTransform : "inherit"}}><a href={`mailto:${application.email}`}>{application.email}</a></small>
                        </div>
                        <div className="col-lg-3">
							<div className="row">
								<div className="col-12">
									<Link href={{
										pathname: '/applications/comment',
										query: { email: `${application.email}`},
									}}>
										<a href={`#Comment-${application.email}`}><i title="Comment" className="icon-comment"></i></a>
									</Link>
								</div>
								<div className="col-12">
									{
										application.comments.length > 0 && 
										<small><span className="badge badge-primary">last comment - {application.comments[application.comments.length-1].body.toString()}</span></small>
									}
									{
										application.comments.length == 0 &&
										<small><span className="badge badge-warning">No Activity</span></small>
									}
								</div>
							</div>
                        </div>
                        <div className="col-lg-2">
                        </div>
                    </div>

					</div>	
				)
			})
		
	}

	const renderCommentBox = () => {
		return (
			<div>
				{isCommentBoxActive && 
					<CommentBox setValues={setValues} values={values} isDataModified={isDataModified} application={applications.find(c => {return a.email == openComment})}/>
				}
			</div>
		)
	}

	const handleSearch = async (e) => {
		// console.log(e.target.value)
		await setValues({ ...values, searchTerm : e.target.value})
		
	}

	const performSearch = () => {
		let cS = []
		function search(nameKey, complaints){
			name = name.toString();
			
			for (var i=0; i < complaints.length; i++) {
				if (complaints[i].orderId.includes(nameKey) || complaints[i].name.toLowerCase().includes(nameKey.toLowerCase()) || complaints[i].email.toLowerCase().includes(nameKey.toLowerCase())) {
					cS.push(complaints[i]);
				}else{
					continue;
				}
			}
		}
		search(searchTerm, complaints)
		setValues({...values, complaintsSorted : cS})
	}

	// console
    return (
        <main style={{height : '100vh'}}>
		<div id="results" style={{position:"sticky", top : "0px", zIndex : "1000"}}>
			<div className="container">
				<div className="row">
					<div className="col-md-6">
						<h4><strong>Showing {applications.length} Applications</strong></h4>
					</div>
					<div className="col-md-6">
						<div className="search_bar_list">
							<input onChange={handleSearch} type="text" value={searchTerm} className="form-control" placeholder="Search Order Id, Name, Email"/>
							<input onClick={performSearch} type="submit" value="Search"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="filters_listing">
			<div className="container">
				{/* <ul className="clearfix" >
					<li>
						<h6>Type</h6>
						<div className="switch-field">
							<input onClick={handleStatus} type="radio" id="all" name="status" value=""/>
							<label htmlFor="all">All</label>
							<input onClick={handleStatus} type="radio" id="resolved" name="status" value="resolved" />
							<label htmlFor="resolved">Resolved</label>
							<input onClick={handleStatus} type="radio" id="unresolved" name="status" value="unresolved" selected/>
							<label htmlFor="unresolved">Unresolved</label>
						</div>
					</li>
					<li>
						<h6>Sort by Agent</h6>
						<select onChange={handleAgent} name="orderby" className="form-control">
							{renderAgentList()}
						</select>
					</li>
					<li>
						<h6>Sort by Priority</h6>
						<div className="switch-field">
							<input onClick={handlePriority} type="radio" id="all" name="priority" value=""/>
							<label htmlFor="all">All</label>
							<input onClick={handlePriority} type="radio" id="high" name="priority" value="1" />
							<label htmlFor="high">High</label>
							<input onClick={handlePriority} type="radio" id="medium" name="priority" value="2"/>
							<label htmlFor="medium">Medium</label>
							<input onClick={handlePriority} type="radio" id="low" name="priority" value="3"/>
							<label htmlFor="low">Low</label>
						</div>
					</li>
				</ul> */}
			</div>
		</div>
		
		<div className="margin_20_35">
			<div className="col-lg-12">
				<div className="container">
					{renderCommentBox()}
					{isFetching && 
						<div className="container">
							<div style={{display : "flex", justifyContent: 'center', alignItems : "center"}}>
								<i style={{fontSize: "40px"}} className="icon-spin6 animate-spin"></i><br/>
								
							</div>
							<div style={{display : "flex", justifyContent: 'center', alignItems : "center"}}>
							<i className="icon-quote-left"></i>
									<em>Let no Man pull you Low Enough to hate him...</em>
								<i className="icon-quote-right"></i>
							</div>
						</div>
					}
					{!isFetching && 
						<div className="">
							{renderComplaints()}
						</div>
					}
				</div>
			</div>
		</div>
	</main>
    )
}
export default GetAllApplicationsCards;