import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spin from './Spin';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) =>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
  /*  static defaultProps = {
      country: "in",
      pageSize: 8,
      category: "general",
    }

    static propTypes ={
      country:PropTypes.string ,
      pageSize: PropTypes.number ,
      category: PropTypes.string
    } */

const capitalizeFirstLetter = (string) =>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
    
  /*constructor(props){
    super(props);
    this.state = {
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(props.category)} - NewsMonkey - `
}*/

useEffect( () =>{
  document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey - `
  updateNews()
  //eslint-disable-next-line
}, [])

/*async componentDidMount(){
  
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0c08a49f5abb4316b888f50f1867f240&page=1&pageSize=${props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({ articles: parsedData.articles,
  totalResults : parsedData.totalResults,
  loading: false  
  })
  this.updateNews();
  
}*/

const updateNews = async() =>{
  props.setProgress(0);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading({loading: true});
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json()
  props.setProgress(70);
  //console.log(parsedData);
  setArticles(parsedData.articles);
  setLoading(false)
  setTotalResults(parsedData.totalResults)
  /*this.setState({
      
      articles: parsedData.articles,
      loading: false
      
  })*/
  props.setProgress(100);
}

const fetchMoreData = async() => {
  
  /*this.setState({
    page: this.state.page + 1
  })*/
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setPage(page + 1)
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  setArticles(articles.concat(parsedData.articles))
  setTotalResults( parsedData.totalResults)
  /*this.setState({
      
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
      
  })*/
};

/* const handleNext =  async () => {
 console.log("Next");
  if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {
  }
  else {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0c08a49f5abb4316b888f50f1867f240&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
      })
  }
  setPage(page + 1)
  /*this.setState({
    page: this.state.page + 1
  })
  updateNews();
}*/

/*const handlePrevious = async () => {
 /* console.log("Previous");
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0c08a49f5abb4316b888f50f1867f240&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  this.setState({loading: true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
  })
  setPage(page - 1)
  /*this.setState({
    page: this.state.page - 1
  })
 updateNews();
}*/

 // render() {
    
    return (
      
      <div className="container my-3">
        <h2 className="text-center" style={{margin:"30px", marginTop:"90px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} HeadLine</h2>
        {loading && <Spin/>}
     <InfiniteScroll
          
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spin/>}
    > 
          <div className="container">
        <div className="row">
    {articles.map((element)=>{
    return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title.slice(0, 15):""}
            description={element.description?element.description.slice(0, 48):""} imageUrl={element.urlToImage}
            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
    </div>
    })}
      </div>
      </div>
   </InfiniteScroll>
    {/*<div className="container d-flex justify-content-between my-2">
        <button type="button" disabled={this.state.page <=1} className="btn btn-warning" onClick={this.handlePrevious}>&larr; Previous</button>
        <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-warning" onClick={this.handleNext}>Next &rarr;</button>
    </div>*/}

        
      </div>
      
    )
    
  }


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}

News.propTypes ={
  country:PropTypes.string ,
  pageSize: PropTypes.number ,
  category: PropTypes.string
}


export default News
