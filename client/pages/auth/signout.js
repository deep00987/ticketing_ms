import { useEffect } from "react";
import useRequest from '../../hooks/user-req';
import Router from 'next/router';
export default () => {
    
    const {performReq} = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => {
            Router.push('/');
        }
    })

    useEffect(() =>{
        performReq();
    }, [])


    return (
        <div>signing out ...</div>
    );
}