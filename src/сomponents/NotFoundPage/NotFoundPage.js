import React, { useEffect } from 'react';
import './NotFoundPage.css';
import { useHistory } from 'react-router-dom';

function NotFoundPage() {

    const history = useHistory()

    useEffect(() => {
        console.log(history)
      }, []);

    const goBack = () => {
        history.go(-2)
    }

    return (
        <section className="notFoundPage">
            <h1 className="notFoundPage__title">404</h1>
            <p className="notFoundPage__subtitle">Страница не найдена</p>
            <button className="notFoundPage__buttun" onClick={goBack}>Назад</button>
        </section>
    )
}

export default NotFoundPage;