import data from './../src/decent.land.json'

interface Playground_Props {
    
}
 
const Playground_ = () => {
    return ( 
        <div className={`w-full min-h-screen flex flex-col justify-center items-center`}>
            {data.res.ERC_NFTS.toString()}
        </div>
     );
}
 
export default Playground_;