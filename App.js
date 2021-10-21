import React from "react";
import { getNewsBySrc , getNewsByCat ,getNewsByTerm, getNewsHeadlines} from "./api";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";
import { Container, Header } from "semantic-ui-react";


class App extends React.Component {
  state = {
    articles: [],
    searchSrc: "",
    searchCat: "",
    searchTerm: "",
    totalResults: "",
    loading: false,
    apiError: ""
  };

  searchSrcNews = async slicedsrclow => {
    let input = "Give me the news from BBC"
    let slicedsrc = input.slice(21)
    let slicedsrclow;
    
   if(slicedsrc === "BBC"){
      slicedsrclow = "bbc-news"
   }
    else{
      slicedsrclow = slicedsrc.toLowerCase()
    }
   
    try {
      this.setState({ loading: true });
      const response = await getNewsBySrc(slicedsrclow);
      this.setState({
        articles: response.articles,
        searchSrc: slicedsrclow,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  searchCatNews = async catfilter => {

    let input = "Show me the latest business news from india";
    let catflg,catfilter,catUrl;
    let category = ["business","entertainment","general","health","science","sports","technology","biology","political"]
        
    //Getting the category from the user command
     for(let i =0 ; i < category.length ; i++){
      if(input.includes(category[i])){
         catflg = true;
         catfilter = category[i]
        }
     }
      console.log(catflg, catfilter)
    try {
      this.setState({ loading: true });
      const response = await getNewsByCat(catfilter);
      this.setState({
        articles: response.articles,
        searchCat: catfilter,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  searchTermNews = async slicedtermlow => {

 let input = "Whats up with Bitcoin"
 var slicedterm = input.slice(13)
 var slicedtermlow = slicedterm.toLowerCase()
          
 try {
      this.setState({ loading: true });
      const response = await getNewsByTerm(slicedtermlow);
      this.setState({
        articles: response.articles,
        searchTerm: slicedtermlow,
        totalResults: response.totalResults
      });
} catch (error) {
      this.setState({ apiError: "Could not find any articles" });
}
    this.setState({ loading: false });
  };

  searchNews = async () => {
    try {
      this.setState({ loading: true });
      const response = await getNewsHeadlines();
      this.setState({
        articles: response.articles,
        totalResults: response.totalResults
      });
    } catch (error) {
      this.setState({ apiError: "Could not find any articles" });
    }
    this.setState({ loading: false });
  };

  render() {
    const {
      articles,
      apiError,
      loading,
      searchCat,
      searchSrc,
      searchTerm,
      totalResults
    } = this.state;
    return (
      <Grid >
        <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
          Search for a topic
        </Header>
        <SearchBar searchForTopic={this.searchForTopic} />
        
        {loading && (
          <p style={{ textAlign: "center" }}>Searching for articles...</p>
        )}
        {articles.length > 0 && (
          <Header as="h4" style={{ textAlign: "center", margin: 20 }}>
            Found {totalResults} articles on "{searchTopic}"
          </Header>
        )}
        {articles.length > 0 && <ArticleList articles={articles} />}
        {apiError && <p>Could not fetch any articles. Please try again.</p>}
      </Grid>
    );
  }
}

export default App;