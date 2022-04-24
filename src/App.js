import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCareer: false,
      showProjects: false,
      showStack: false,
      showLanguages: false,
      externalLinks: [],
      currentOrganisation: null,

      intro: null,
      end: null,
      projectInfo: [],
      techStack: null,
      careerInfo: null,
      role: null
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.getExternalLinks = this.getExternalLinks.bind(this);
    this.getDataInfo = this.getDataInfo.bind(this);
  }

  componentWillMount() {
    this.getExternalLinks();
    this.getDataInfo();
  }


  getExternalLinks() {
    fetch('./content/external.json')
      .then(response => response.json())
      .then(data =>
        this.setState({
          externalLinks: data.data,
          currentOrganisation: data.currentOrganisation,
          role: data.currentOrganisation.role
        })
      )
      .catch(error => console.error('Something went wrong!', error));
  }

  getDataInfo() {
    fetch('./content/data.json')
      .then(response => { 
        return response.json();
      })
      .then(data => {
        this.setState({
          intro: data.intro,
          end: data.end,
          projectInfo: data.projectInfo,
          techStack: data.techStack,
          careerInfo: data.careerInfo
        });
      })
      .catch(error => console.error('Something went wrong!'));
  }

  handleOnClick(n) {
    switch (n) {
      case 0:
        this.setState({ showCareer: !this.state.showCareer });
        this.state.showProjects && this.setState({ showProjects: false });
        this.state.showStack && this.setState({ showStack: false });
        this.state.showLanguages && this.setState({ showLanguages: false });
        break;
      case 1:
        this.setState({ showProjects: !this.state.showProjects });
        this.state.showCareer && this.setState({ showCareer: false });
        this.state.showStack && this.setState({ showStack: false });
        this.state.showLanguages && this.setState({ showLanguages: false });
        break;
      case 2:
        this.setState({ showLanguages: !this.state.showLanguages });
        this.state.showCareer && this.setState({ showCareer: false });
        this.state.showProjects && this.setState({ showProjects: false });
        this.state.showStack && this.setState({ showStack: false });
        break;
      case 3:
        this.setState({ showStack: !this.state.showStack });
        this.state.showCareer && this.setState({ showCareer: false });
        this.state.showProjects && this.setState({ showProjects: false });
        this.state.showLanguages && this.setState({ showLanguages: false });
        break;
      default:
        break;
    }
  }
  render() {
    const bioLinks =
      this.state.externalLinks &&
      this.state.externalLinks.map(e => (
        <p className='bio-links'>
          <a href={`${e.url}`} target='_blank'>{`${e.title}`}</a>
        </p>
      ));
    const languages =
      this.state.techStack &&
      this.state.techStack.languages.map(t => (
        <li className='bullet-info'>
          <span className='bullet-highlights1'>{`${t}`}</span>
        </li>
      ));

    const technologies =
      this.state.techStack &&
      this.state.techStack.technologies.map(t => (
        <li className='bullet-info'>
          <span className='bullet-highlights1'>{`${t}`}</span>
        </li>
      ));

    const currentOrganisation = this.state.currentOrganisation && (
      <a
        className='current-org'
        href={`${this.state.currentOrganisation.url}`}
        target='_blank'
      >{`${this.state.currentOrganisation.title}`}</a>
    );

    const careerInfo =
      this.state.careerInfo &&
      this.state.careerInfo.map((c, i) => (
        <li className='bullet-info'>
          <span className='bullet-highlights1'>{`${c.time}`}</span>
          <span className='bullet-highlights2'>{`${c.company}`}</span>
          <span className='bullet-highlights3'>{`${c.title}`}</span>
          {/* <br /> */}
          {/* <span className='bullet-description' hidden='true'>{`${
            c.Description
          }`}</span> */}
        </li>
      ));

    const projectInfo =
      this.state.projectInfo &&
      this.state.projectInfo.map(p => (
        <li className='bullet-info'>
          <span className='bullet-highlights1'>
            <a href={`${p.url}`} target='_blank'>{`${p.title}`}</a>
          </span>
        </li>
      ));

    return (
      <div className='App'>
        <header className='App-body'>
          <h1 className='App-title'>Teja Thota (Tejasvi)</h1>
          <h2 className='App-sub-title'>{this.state.role} in London 🇬🇧</h2>
          {bioLinks}
          <div className='App-intro'>
          <h3 className='App-sub-sub-title'>About</h3>
            Hi, I'm a {this.state.role} at{' '}
            {currentOrganisation} 👨‍💻.

          <div className='App-intro'>{this.state.intro}</div>
          </div>
          <div>
            <h3
              className='bullet-heading'
              onClick={() => {
                this.handleOnClick(0);
              }}
            >
              [{this.state.showCareer ? '-' : '+'}] Career
            </h3>
            {this.state.showCareer && careerInfo}
          </div>
          <div>
            <h3
              className='bullet-heading'
              onClick={() => {
                this.handleOnClick(1);
              }}
            >
              [{this.state.showProjects ? '-' : '+'}] Open Source Contributions
            </h3>
            {this.state.showProjects && projectInfo}
          </div>
          <div>
            <h3
              className='bullet-heading'
              onClick={() => {
                this.handleOnClick(2);
              }}
            >
              [{this.state.showLanguages ? '-' : '+'}] Languages
            </h3>
            {this.state.showLanguages && languages}
          </div>
          <div>
            <h3
              className='bullet-heading'
              onClick={() => {
                this.handleOnClick(3);
              }}
            >
              [{this.state.showStack ? '-' : '+'}] Technologies
            </h3>
            {this.state.showStack && technologies}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
