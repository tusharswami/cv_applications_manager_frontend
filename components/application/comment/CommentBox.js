import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import moment from 'moment';
import {addCommentAction, fetchCommentsByIdAction} from '../../../actions/applicationsBackend';
import {isAuth} from '../../../actions/auth';

const CommentBox = ({email}) => {
    const router = useRouter()
    const [commentBoxValues, setCommentBoxValues] = useState({
        formData : '',
        newComment : '',
        success : '',
        error : '',
        isFetching : false,
        isViewerOpen : false,
        imageSource : '',
        comments : [],
        file : ''
    })

    const { newComment, file, success, error, isFetching, comments, isViewerOpen, imageSource} = commentBoxValues;
    
    useEffect( () => {
         setCommentBoxValues({ ...commentBoxValues});
        console.log(email)
        fetchComments()
    }, [])
    const fetchComments = () => {
        setCommentBoxValues({...commentBoxValues , isFetching :true})
        fetchCommentsByIdAction(email)
            .then(data => {
                console.log(data)
                if(data.status === 200){
                    setCommentBoxValues({...commentBoxValues , comments : data.comments, isFetching :false})
                    
                }else{
                    setCommentBoxValues({...commentBoxValues , error : data.err, isFetching :false})
                }
            })
            .catch(error => {
                console.log(error)
                setCommentBoxValues({...commentBoxValues , error : data.err, isFetching :false})
            })
    }
    // console.log(openComment)
    const handleChange = name => e => {
        // console.log(e.target.value);
        console.log(name)
        // console.log(formData)
        const value = name === 'image' ? e.target.files[0] : e.target.value;
        console.log(name, value)
        // formData.set(name, value);
        setCommentBoxValues({ ...commentBoxValues, file: value, error: '' });
    };
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );
    const renderCommentTabs = () => {
        return (
            <aside class="col-lg-3" id="sidebar">
                    <div class="box_style_cat" id="faq_box">
                        <ul id="cat_nav">
                            {comments.map((comment, index) => (
                                <li><a href={`#comment-${index + 1}`} class="active"><i class="icon_document_alt"></i>{`#${index+1}`} {comment.commentBy} - {moment(comment.createdAt).fromNow()}</a></li>
                            ))}
                        </ul>
                    </div>
            </aside>    
        )
    }

    const addComment = e => {
        e.preventDefault();
        let formData = new FormData();
        formData.set("email", email);
        formData.set("commentBy", isAuth().name.split(' ')[0]);
        formData.set("body", newComment);
        formData.set("image", file);
        console.log(formData);
        setCommentBoxValues({...commentBoxValues, isFetching : true})
        addCommentAction(formData).then(data => {
            if(data){
                if(data.status == 200){
                    console.log(data)
                    // setValues({ ...values});
                    setCommentBoxValues({...commentBoxValues, isFetching : false, success: "Comment Added Succesfully", newComment : '', file: ''})
                    fetchComments();
                }else{
                    console.log(data)
                    setCommentBoxValues({...commentBoxValues, isFetching : false, error: data.err})
                }
            }
        })
        .catch(err => {
            setCommentBoxValues({...commentBoxValues, error : err, isFetching : false})
        })
    };

    const renderComments = () => {
        if(comments.length === 0){
			return (
                <div class="container margin_60" style={{position: "absolute", width : "", height : "100%", zIndex : "999", background: "#fff"}}>
                <button className="btn_1" onClick={() => router.back()} style={{float : "right"}}>Close</button>
                	<h2 className="text-center"> No Activity Found </h2>
				</div>
			)
		}
        return (
            
                <div class="container margin_60" style={{position: "absolute", width : "", height : "100%", zIndex : "999", background: "#fff"}}>
                
                <button className="btn_1" onClick={() => router.back()} style={{float : "right"}}>Close</button>
                    <div class="row" style={{background : 'white'}}> 
                        {renderCommentTabs()}
                        
                        <div class="col-lg-9" id="faq">
                            <h4 class="nomargin_top">Comments and Recent Updates</h4>
                            <div role="tablist" class="add_bottom_45 accordion" id="payment">
                                {comments.map((comment, index) => (
                                    
                                    <div class="card" style={{background : "#f5f8fa"}} id={`comment-${index + 1}`}>
                                        <div id="collapseOne_payment" class="collapse show" role="tabpanel" data-parent="#payment">
                                            <div class="card-body">
                                                <div className="row">
                                                    <div className="col-lg-9">
                                                    <p>{comment.body}</p>
                                                    </div>
                                                    <div className="col-lg-3">
                                                    <small style={{float: "right"}}>{`#${index+1}`} {comment.commentBy} - {moment(comment.createdAt).fromNow()}</small>
                                                    {/* {
                                                        comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'png' || 
                                                        comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'jpg' || 
                                                        comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'jpeg' || 
                                                        comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'gif' &&
                                                        <small onClick={()=>{setCommentBoxValues({...commentBoxValues, isViewerOpen : true, imageSource: comment.attachmentUrl})}}style={{float: "right", cursor : "pointer"}}>{comment.attachmentUrl ? <button className="btn_1"> View <i className="icon-doc"></i></button> : <small></small>   }</small>                                                        
                                                    } */}
                                                    {
                                                        (
                                                            comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'png' || 
                                                            comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'jpg' || 
                                                            comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'jpeg' || 
                                                            comment.attachmentUrl.substring(comment.attachmentUrl.lastIndexOf('.')+1) === 'gif'
                                                        )
                                                        ? <small onClick={()=>{setCommentBoxValues({...commentBoxValues, isViewerOpen : true, imageSource: comment.attachmentUrl})}}style={{float: "right", cursor : "pointer"}}>{comment.attachmentUrl ? <button className="btn_1"> View <i className="icon-doc"></i></button> : <small></small>   }</small>
                                                        : <a href={`${comment.attachmentUrl}`}><small style={{float: "right", cursor : "pointer"}}>{comment.attachmentUrl ? <button className="btn_1"> Download <i className="icon-doc"></i></button> : <small></small>   }</small></a>
                                                    }
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))}         
                            </div>
                            
                        </div>  
                    </div>
                </div>
        )
    }

    return (
        <div>
            {showError()}
            {showSuccess()}

            {isViewerOpen &&
                <div className="container" style={{position: "absolute", zIndex : 1000, width : "100vw", height : "100vh", background : "white", display : "flex", justifyContent : "center", alignItems : "center", padding : "10px"}}>
                    {/* <button className="btn_1" onClick={() => {setCommentBoxValues({...commentBoxValues, isViewerOpen : false})}} style={{float : "right"}}>Close</button> */}
                    <a onClick={() => {setCommentBoxValues({...commentBoxValues, isViewerOpen : false})}} className="close_bt" title="Close" ></a>
                    <img src={imageSource} alt="Image" width="auto" height="100%"/>
                </div>
                    
                
            }
            {!isViewerOpen && 
                <div className="container">
                    <div id="results">
                    <div className="container">
                        
                            <form onSubmit={addComment} enc-type='multipart/form-data'>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="search_bar_list">
                                            <div className="form-group">
                                                <input type="text" name="body" value={newComment} onChange={(e) => {console.log(e.target.value);setCommentBoxValues({...commentBoxValues, newComment : e.target.value})}} className="form-control" placeholder="Put a Comment here."/>
                                                <input type="submit" value="✓"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        
                    </div>
                </div>
                {renderComments()}
                </div>
            }
        </div>
    )
}


export default CommentBox;