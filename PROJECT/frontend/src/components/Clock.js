import React, { Component } from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
        this.days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        this.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        const { date } = this.state
        const dateSting = `${this.days[date.getDay() - 1]}, ${date.getDate()} de ${this.months[date.getMonth()]} de ${date.getFullYear()}`
        return <article className="clock" title={dateSting}>
            <h4 className="clock__string">{dateSting}</h4>
            <h4 className="clock__time">{date.toLocaleTimeString()}</h4>
            <h4 className="clock__date">{date.toLocaleDateString()}</h4>
        </article>

    }
}