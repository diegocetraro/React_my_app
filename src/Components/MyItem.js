import React from 'react';

/*class Item extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            randomNumber: 0,
            totalRemaining: 100,
            changeColor: 'text-dark',
            changeSize: 'fs-2',
        }
    }

    clickMe(){
       this.setState({
            randomNumber: Math.ceil(Math.random()*100),
            totalRemaining: this.state.totalRemaining - 1,
            changeColor: 'text-light',
            changeSize: 'fs-6'
       })
    }
    render () {
        return(
            <div className="app-header">
                <h1>Hello World {this.props.dude}</h1>
                <button onClick={() => this.clickMe()} className="btn btn-outline-light">Click Me</button>
                <p className={this.state.changeColor} >You clicked {this.state.randomNumber} times. {this.state.totalRemaining} clicks remaining</p>
            </div>
        )
    }
}
*/

class Film extends React.Component{
    
    render(){
        return(
            <div>
                <ul>
                    <li><a href={this.props.url}>{this.props.film_name}</a></li>
                </ul>
            </div>
        )
    }
}


class StarWars extends React.Component{

    constructor(props){
        super(props)

        this.state = {
           c_name: null,
           height: null,
           homeworld: null,
           homeworld_url: null,
           film_names: [],
           films: [],
           loaded: false,
        }
    }
  
    getJsonRequest(url){
        fetch(url)
            .then(response => response.json())
            .then(data => {
                fetch(data['homeworld'])
                .then(response => response.json())
                .then(hw => {
                    this.setState({
                        c_name: data.name,
                        height: data.height,
                        films: data.films,
                        homeworld_url: data.url,
                        homeworld: hw.name,
                        loaded: true,
                    })
                })
            })
    }

    click(){
        let randomCharacter = Math.ceil(Math.random()*88)
        console.log(randomCharacter)
        this.getJsonRequest(`https://swapi.dev/api/people/${randomCharacter}/`)
    }

    render(){
        
        this.state.films.forEach( (film) =>{
            fetch(film)
            .then(response => response.json())
            .then(data =>{
                this.setState(state =>{
                    const film_names = [...state.film_names, data.title]
                    return{
                        film_names,
                    }
                })
            })
        })

        console.log(this.state.film_names)
        
        const movies = this.state.films.map( (url,i) =>{
            console.log(i)
            return <Film key={i} url={url} film_name={this.state.film_names[i]}/>
        })
        console.log(movies)
        return (    
            <div>
                {
                    this.state.loaded &&
                    <div>
                        <h1 className="fs-1 text-secondary">Start Wars Stuff!!!</h1>
                        <h1 className="fs-4">This is Star Wars</h1>
                        <h1 className="fs-5">Name: {this.state.c_name}</h1>
                        <p className="fs-5">Height: {this.state.height}</p>
                        <p className="fs-5">Homeworld: <a className="nav-link d-inline" href={this.state.homeworld_url}>{this.state.homeworld}</a></p>
                        <h1 className="fs-5">Films in Here: </h1>
                        <ul>
                            {movies}
                        </ul>
                    </div>
                }
                <button onClick={() => this.click()}className="btn btn-outline-light">Search Character</button>
            </div>
        )
    }
}
export default StarWars;