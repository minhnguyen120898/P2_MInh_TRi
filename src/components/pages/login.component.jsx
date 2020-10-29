import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { getUser } from '../../api/authApi';
import {  getEmail, getPassword } from '../../redux/actions/loginAction';
import Footer from '../partials/footer.component';
import Header from '../partials/header.component';

function Login() {

    const { email, password } = useSelector(state => state.login);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async (event) => {
        event.preventDefault();

        let res = await getUser(email);

        if(res.data.length) {
            if(res.data[0].password === password) {
                localStorage.setItem("token",JSON.stringify(res.data[0]));
                history.push("/");
                alert("Đăng nhập thành công!")
            }
        }else {
            alert("Đăng nhập không thành công!");
        }
    }
    
    if(localStorage.getItem("token")){
        return <Redirect to="/"/>
    }

    return (
        <div>
            <Header />
            <div className="login">
                <p className="login__title">Đăng nhập</p>
                <form onSubmit={ onSubmit }>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email"                               
                                value={ email }
                                onChange={ (e) => dispatch(getEmail(e.target.value)) }
                                placeholder="Nhập email ở đây" 
                                required/>
                        </div>
                        <div className="col-12 col-md-6">
                            <label htmlFor="password">Mật Khẩu:</label>
                            <input 
                                type="password"                                
                                value= { password } 
                                onChange={ (e) => dispatch(getPassword(e.target.value)) }
                                placeholder="Nhập mật khẩu ở đây" 
                                required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className="login__btn-login" type="submit">Đăng nhập</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <a href="./" className="login__forgetPassword">Tìm lại mật khẩu</a>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Login;