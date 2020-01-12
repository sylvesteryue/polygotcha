import React from 'react';
import '../App.css';

class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
       language: 'en'
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

};

showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }



  handleClick(e) {
    //this.setState({language: e.target.id});

    const data = new FormData();

    data.append('option', e.target.id)

    fetch('http://localhost:5000/translate', {
        method: 'POST',
        body: data,
      }).then(results => results.json())
      .then(data => this.setState({ data })
      )
  }

  render() {
      var value;
    return (
        <div  className="dropdown" style = {{background:"lightseagreen",width:"200px",borderRadius:"10px",position: "absolute",right: "8%",top: "2%",}} >
         <div className="button" onClick={this.showDropdownMenu}> Languages </div>

          { this.state.displayMenu ? (
          <ul>
         <div className="dropdown-item" ref="megaDrop">
            <li><a className="dropdown-link" href="#Eng" id='en' onClick={this.handleClick.bind()}>English</a>
            </li>
          </div>
         <div className="dropdown-item" ref="megaDrop">
            <li><a className="dropdown-link" href="#Chn" id='zn-CN' onClick={this.handleClick.bind()}>Chinese</a>
            </li>
         </div>
         <div className="dropdown-item" ref="megaDrop">
            <li><a className="dropdown-link" href="#Jpn" id='ja' onClick={this.handleClick.bind()}>Japanese</a>
            </li>
         </div>
         <div className="dropdown-item" ref="megaDrop">
            <li><a className="dropdown-link" href="#Spn" id='es' onClick={this.handleClick.bind()}>Spanish</a>
            </li>
         </div>
         {/* <li><a href="#Activity Logs">Activity Logs</a></li>
         <li><a href="#Setting">Setting</a></li>
         <li><a href="#Log Out">Log Out</a></li> */}
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

export default Dropdown;