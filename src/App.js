
import './App.css';

import React, { useState } from 'react';

import Navigation from './Data/Navigation';
import News from './Data/News';

import { Route, Routes } from "react-router";
import {
  BrowserRouter as Router
   
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';




const App = () => {
 const pagesize = 9;
 const apiKey = process.env.REACT_APP_NEWS_API
 const [progress, setProgress] = useState(0);
 /* state = {
    progress: 0
  }
  setProgress = (progress) =>{
    setState({progress: progress})
  }*/
 // render() {
    return (
      <div>
        
        <Router>
        <Navigation/>
        <LoadingBar
        height = {3}
        color='#f11946'
        progress={progress}
        
      />
        <Routes>
        
          <Route path="/" element={<News setProgress={setProgress} apiKey ={apiKey} key="sports" pageSize={pagesize} country="in" category="sports"/>}/>
          <Route path="/sports" element={<News setProgress={setProgress} apiKey ={apiKey} key="sports" pageSize={pagesize} country="in" category="sports"/>}/>
          <Route path="/business" element={<News setProgress={setProgress} apiKey ={apiKey} key="business" pageSize={pagesize} country="in" category="business"/>} />
          <Route path="/entertainment" element={<News setProgress={setProgress} apiKey ={apiKey} pageSize={pagesize} key="entertainment" country="in" category="entertainment"/>} />
          <Route path="/general" element={<News setProgress={setProgress} apiKey ={apiKey} key="general" pageSize={pagesize} country="in" category="general"/>}/>
          <Route path="/health" element={<News setProgress={setProgress} apiKey ={apiKey} key="health" pageSize={pagesize} country="in" category="health"/>}/>
          <Route path="/science" element={<News setProgress={setProgress} apiKey ={apiKey} key="science" pageSize={pagesize} country="in" category="science"/>}/>
          <Route path="/technology" element={<News setProgress={setProgress} apiKey ={apiKey} key="technology" pageSize={pagesize} country="in" category="technology"/>}/>
            
        
     
            
        
      
    </Routes>
        
        {/*<News pageSize={pagesize} country="in" category="sports"/>*/}
        </Router>
      </div>
    )
  }
export default App;
