import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Redirect, useHistory } from 'react-router';
import Alert from 'react-bootstrap/Alert';
import { getUser, postUserRegister } from '../../api/authApi';
import { getAddress, getEmail, getGender, getPhone,getPassword, getName, getAll } from '../../redux/actions/registerAction';
import Footer from '../partials/footer.component';
import Header from '../partials/header.component';


function Register() {

    const { email , name , phone , password, address, gender} = useSelector(state => state.register);

    const dispatch = useDispatch();
    const history = useHistory();
    const [showAlert,setShowAlert] = useState(false);

    useEffect(() => {
        const emptyUser = {
            name : "",
            email : "",
            phone : "",
            address : "",
            gender : "",
            password : "",
        }
        dispatch(getAll(emptyUser));
    },[dispatch]);

    if(localStorage.getItem("token")){
        return <Redirect to="/"/>
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name,
            email,
            phone,
            address,
            gender,
            password : btoa(password),
        }
        let res = await getUser(email);
        if(res.data.length) {
            alert("Email đã tồn tại! Vui lòng nhập email khác.")
        }else {
            let resp = await postUserRegister(newUser);
            console.log(resp);
            localStorage.setItem("token", JSON.stringify(resp.data));
            setShowAlert(true);
            setTimeout(function(){
                history.push("/login");
            },1000);
        }    
    }
    return (
        <div>
            <Header />
            <div className="register">
                <Alert show={showAlert} variant="success">
                    <p>Đăng ký thành công!</p>
                    <button onClick={() => setShowAlert(false)}>Đóng</button>
                </Alert>
                <p className="register__title">Đăng ký</p>
                <form onSubmit={ onSubmit }>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label>Họ Tên:</label>
                            <input 
                                type="text"
                                value={ name }
                                onChange = { (e) => dispatch(getName(e.target.value))}
                                placeholder="Nhập họ tên ở đây"
                                required
                                />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Giới tính:</label>
                             <select
                                value={gender}
                                onChange={(e) => dispatch(getGender(e.target.value))}
                                >
                                <option value="" disabled>Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Email:</label>
                            <input 
                                type="email"                               
                                value={ email }
                                onChange={ (e) => dispatch(getEmail(e.target.value)) }
                                placeholder="Nhập email ở đây" 
                                required/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Số điện thoại:</label>
                            <input 
                                type="text"             
                                value={ phone }                  
                                onChange={ (e) => dispatch(getPhone(e.target.value)) }
                                placeholder="Nhập sdt ở đây" 
                                required/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Mật Khẩu:</label>
                            <input 
                                type="password"                                
                                value= { password } 
                                onChange={ (e) => dispatch(getPassword(e.target.value)) }
                                placeholder="Nhập mật khẩu ở đây" 
                                required/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Địa chỉ:</label>
                            <input 
                                type="text"
                                value={address}                                
                                onChange={ (e) => dispatch(getAddress(e.target.value)) }
                                placeholder="Nhập địa chỉ ở đây" 
                                required/>
                        </div>                   
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="register__btn-register" type="submit">Đăng ký</button>
                        </div>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Register;