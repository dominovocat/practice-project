import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { getUserAction } from '../../actions/actionCreator';
import Spinner from '../Spinner/Spinner';

const PrivateRoute = (props) => {
    const userStore = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const history = useHistory();

    const getUser = useCallback(
        (data) => dispatch(getUserAction(data)),
        [dispatch],
    );

    useEffect(() => {
        if (!userStore.data) {
            getUser(history.replace);
        }
    }, [getUser, history.replace, userStore.data]);

    if (userStore.error) return <Redirect to="/" />;

    return (
        <>{userStore.isFetching ? <Spinner mtop /> : <Route {...props} />}</>
    );
};

export default PrivateRoute;
