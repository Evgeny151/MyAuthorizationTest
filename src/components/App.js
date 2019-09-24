import React from "react";
import Field from "./Field";
import countries from "../data/countries";
import cities from "../data/cities";
import cn from 'classnames';

export default class App extends React.Component {
  constructor(){
    super();

    this.state = {
      activeStep: 1,
      firstname: '',
      lastname: '',
      password: '',
      repeatPassword: '',
      gender: 'male',
      email: '',
      mobile: '',
      country: '',
      city: '',
      avatar: '',
      errors: {
        firstname: false,
        lastname: false,
        password: false,
        repeatPassword: false,
        age: false,
        email: false,
        mobile: false
      },
      steps: [
        {
          id: 1,
          isActive: true,
          isCompleted: false,
          name: 'Basic'
        },
        {
          id: 2,
          isActive: false,
          isCompleted: false,
          name: 'Contacts'
        },
        {
          id: 3,
          isActive: false,
          isCompleted: false,
          name: 'Avatar'
        },
        {
          id: 4,
          isActive: false,
          isCompleted: false,
          name: 'Finish'
        }
      ]
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

    if (event.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = event => {
      this.setState({
          avatar: event.target.result
      })
    };
  
    reader.readAsDataURL(event.target.files[0]);
    }
  }

  goToNextStep = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    }, () => {
      const activeStep = this.state.activeStep; // 2
      const prevStep = activeStep - 1; // 1

      this.setState({
      steps: this.state.steps.map((step) => {
        if (step.id === activeStep) {
          return {
            ...step,
            ...{
              isActive: true,
              isCompleted: false
            }
          }
        }

        if (step.id === prevStep) {
          return {
            ...step,
            ...{
              isActive: false,
              isCompleted: true
            }
          }
        }

        return step;
      })
    })
    })
  }
  
  goToPrevStep = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    }, () => {
      const activeStep = this.state.activeStep; // 1
      const nextStep = activeStep + 1; // 2

      this.setState({
        steps: this.state.steps.map((step) => {
          if (step.id === activeStep) {
            return {
              ...step,
              ...{
                isActive: true,
                isCompleted: false
              }
            }
          }

          if (step.id === nextStep) {
            return {
              ...step,
              ...{
                isActive: false,
                isCompleted: false
              }
            }
          }

          return step;
        })
      })
    })
  }

  onSubmitPrevious = event => {
    event.preventDefault();

    if (this.state.activeStep > 1) {
      this.goToPrevStep();
    }
  }

  onSubmitNext = event => {
    event.preventDefault();
    const errors = {};

    if (this.state.firstname.length < 5) {
      errors.firstname = 'Must be 5 characters or more';
    }

    if (this.state.lastname.length < 5) {
      errors.lastname = 'Must be 5 characters or more';
    }

    if (!this.state.password) {
      errors.password = 'Required'
    }

    if (this.state.password.length < 6) {
      errors.password = 'Must be 6 characters or more'
    }

    if (this.state.password !== this.state.repeatPassword) {
      errors.repeatPassword = 'Must be equal password'
    }

    if (!this.state.email) {
      errors.email = 'Involid email'
    }

    if (!this.state.mobile) {
      errors.mobile = 'Involid mobile'
    }

    if (Object.keys(errors).length !== 0) {
      this.setState({
        errors: errors
      })
    }

    if (!errors.firstname && !errors.lastname && !errors.password && !errors.repeatPassword) {
      this.goToNextStep(); 
    }


    if (!errors.email && !errors.mobile) {
      this.goToNextStep();
    }
  }

  getOptionsCountryItems = items => {
    return items.map(item => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))
  }

  getOptionsCities = cities => {
    var citiesArr = [];  
  
    for (let key in cities) {
      citiesArr.push(cities[key]);
    }

    if (this.state.country === '1') {
      return citiesArr.map(city => (
        <option key={citiesArr.indexOf(city)} value={citiesArr.indexOf(city)}>
          {city.country === 1 ? city.name : null}
        </option>
      ))
    }

    if (this.state.country === '2') {
      return citiesArr.map(city => (
        <option key={citiesArr.indexOf(city)} value={citiesArr.indexOf(city)}>
          {city.country === 2 ? city.name : null}
        </option>
      ))
    }
  }

  renderSteps = () => {
    const {steps} = this.state

    return steps.map(step => (
      <div
        className={cn('step', {
          'is-active': step.isActive,
          'is-completed': step.isCompleted
        })}
      >
        <div className="step__marker">{step.id}</div>
        <div className="step__title">{step.name}</div>
      </div>
    ))
  }

  render() {
    const Steps = this.renderSteps;
    const classField = cn('input-item', {
      'block-none': !(this.state.activeStep === 1 || this.state.activeStep === 4)
    }) 
    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="steps">
            <Steps />
          </div>
          <Field
            id='firstname'
            className={classField}
            labelText='Firstname'
            type='text'
            placeholder="Enter firstname"
            name='firstname'
            value={this.state.firstname}
            onChange={this.onChange}
            error={this.state.errors.firstname}
          />
          <Field
            id='lastname'
            className={classField}
            labelText='Lastname'
            type='text'
            placeholder="Enter lastname"
            name='lastname'
            value={this.state.lastname}
            onChange={this.onChange}
            error={this.state.errors.lastname}
          />
          <Field
            id='password'
            className={classField}
            labelText='Password'
            type='text'
            placeholder="Enter password"
            name='password'
            value={this.state.password}
            onChange={this.onChange}
            error={this.state.errors.password}
          />
          <Field
            id='repeatPassword'
            className={classField}
            labelText='Repeat password'
            type='text'
            placeholder="Enter repeat password"
            name='repeatPassword'
            value={this.state.repeatPassword}
            onChange={this.onChange}
            error={this.state.errors.repeatPassword}
          />
          <fieldset className={classField}>
            <div>Gender</div>
            <div>
              <input
                type='radio'
                id='male'
                name='gender'
                value='male'
                checked={this.state.gender === 'male'}
                onChange={this.onChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type='radio'
                id='female'
                name='gender'
                value='female'
                checked={this.state.gender === 'female'}
                onChange={this.onChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </fieldset>
          <Field
            id='email'
            className={this.state.activeStep === 2 || this.state.activeStep === 4 ? "input-item" : "input-item block-none"}
            labelText='Email'
            type='text'
            placeholder="Enter email"
            name='email'
            value={this.state.email}
            onChange={this.onChange}
            error={this.state.errors.email}
          />
          <Field
            id='mobile'
            className={this.state.activeStep === 2 || this.state.activeStep === 4 ? "input-item" : "input-item block-none"}
            labelText='Mobile'
            type='text'
            placeholder="Enter mobile"
            name='mobile'
            value={this.state.mobile}
            onChange={this.onChange}
            error={this.state.errors.mobile}
          />
          <div className={this.state.activeStep === 2 || this.state.activeStep === 4 ? "input-item" : "input-item block-none"}>
            <div>Country</div>
            <select
              id="countries"
              value={this.state.country}
              name="country"
              onChange={this.onChange}
            >
              {this.getOptionsCountryItems(countries)}
            </select>
          </div>
          <div className={this.state.activeStep === 2 || this.state.activeStep === 4 ? "input-item" : "input-item block-none"}>
            <div>City</div>
            <select
              id="city"
              value={this.state.city}
              name="city"
              onChange={this.onChange}
            >
              {this.getOptionsCities(cities)}
            </select>
          </div>
          <div className={this.state.activeStep === 3 || this.state.activeStep === 4 ? "input-item" : "input-item block-none"}>
            <label>Avatar</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={this.onChange}
            />
          </div>
          <button
            type='submit'
            onClick={this.onSubmitPrevious}
          >Previous
          </button>
          <button
            type='submit'
            onClick={this.onSubmitNext}
          >Next
          </button>
        </form>
      </div>
    );
  }
}