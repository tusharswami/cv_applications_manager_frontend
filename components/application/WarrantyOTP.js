import {useState} from 'react';
import {registerApplication} from '../../actions/application';
const WarrantyOTP = ({email, setIsApplicationRegistered, setValues, values}) => {
    const [otp, setOtp] = useState("")
    const verifyWithOtp = () => {
        registerApplication(invoiceNumber, otp).then(data => {
            if(data.error){
                console.log(data)
                setValues({ ...values, error: data.error });
            }
            if(data.status === 404){
                setValues({ ...values, error : data.error });
                // setIsWarrantyRegistered(true)
            }
            else{
                console.log(data)
                if(data.status === 200){
                    setValues({ ...values, success : data.msg });
                    setIsWarrantyRegistered(true)
                }
            }  
        })
    }
    const handleChange = (e) => {
        setOtp(e.target.value)
    }
    
    return (
        <div>
            <p>Please enter the OTP sent on {values.mobile}</p>
            <div className="form-group">
                <input className="form-control" onChange={handleChange} type="text" name="otp" id="" value={otp}/>
            </div> 
            <button className="btn_1" onClick={verifyWithOtp}>Verify</button>
        </div>
    )
}

export default WarrantyOTP;