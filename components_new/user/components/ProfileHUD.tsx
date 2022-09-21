interface ProfileHUDProps {
    
}
 
const ProfileHUD = ({}:ProfileHUDProps) => {
    return (
        <div className={`w-[900px] h-[300px] rounded-[4px] shadow-md bg-[ghostwhite] relative mx-auto mt-4 flex flex-col justify-center items-center overflow-hidden`}>
            <img className={`w-full h-full object-cover absolute top-0`} src={`https://images.pexels.com/photos/345415/pexels-photo-345415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`}/>
            <div className={`_filter w-full h-full absolute top-0`}/>
            <div className={`w-full h-full absolute top-0 p-[20px]`}>
                <div className={'w-[300px] h-full absolute bottom-0 left-0 bg-white/40'} />
            </div>
        </div>
    );
}
 
export default ProfileHUD;