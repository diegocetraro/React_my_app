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
                    <li><a className="nav-link" href={this.props.url}>{this.props.film_name}</a></li>
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
           image: "",
           wiki: "",
        }
    }
  
    getCharacterData(url){
        this.setState({
            film_names: []
        })
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data){
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
                    if(data.films){
                        data.films.forEach( (film) =>{
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
                    }
                    
                }
                                
            })
    }

    getCharacterImage(url){
        fetch(url)
            .then(response => response.json())
            .then(data =>{
                this.setState({
                    image: data.image,
                    wiki: data.wiki
                })
            })
    }

    click(){
        let randomCharacter = Math.ceil(Math.random()*88)
        this.getCharacterData(`https://swapi.dev/api/people/${randomCharacter}/`)
        this.getCharacterImage(`https://raw.githubusercontent.com/akabab/starwars-api/master/api/id/${randomCharacter}.json`)
    }

    render(){   
        const movies = this.state.films.map( (url,i) =>{
            return <Film key={i} url={url} film_name={this.state.film_names[i]}/>
        })
        return (    
            <div className="bg-image text-center">
                 <button onClick={() => this.click()} className="btn btn-outline-warning text-center m-4">Search Character</button>
                {
                    this.state.loaded &&
                    <div class="container text-light">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={this.state.image} className="img-fluid max-height rounded shadow-lg" alt="Character Img"/>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12 border border-warning p-2">
                                        <h1 className="fs-4">Character Profile</h1>
                                    </div>
                                    <div className="col-md-6 text-start p-3 border border-warning">
                                        <h1 className="fs-5">Name: {this.state.c_name}</h1>
                                        <p className="fs-5">Height: {this.state.height}</p>
                                        <p className="fs-5">Homeworld: <a className="nav-link d-inline" href={this.state.homeworld_url}>{this.state.homeworld}</a></p>
                                    </div>
                                    <div className="col-md-6 p-3 border border-warning text-start">
                                        <h1 className="fs-5">Films in Here: </h1>
                                        <ul>
                                            {movies}
                                        </ul>
                                    </div>
                                    <div className="col-md-12 text-start border border-warning p-3">
                                        <h1 className="fs-4">Wiki: <a href={this.state.wiki} className="nav-link d-inline">{this.state.wiki}</a></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
export default StarWars;