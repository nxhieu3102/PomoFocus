import NavBar from "../components/Home/NavBar";
import Time from "../components/Home/Time";
import Footer from "../components/Home/Footer";
const Home = () => {
    return (  
        <>
            <div className="h-screen bg-primary-color">
                <NavBar/>
                <Time/>
                <Footer/>
            </div>
        </>
    );
}
 
export default Home;