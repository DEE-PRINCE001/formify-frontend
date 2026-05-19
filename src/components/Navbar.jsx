import image from '../assets/logo.svg';

export default function Navbar() {
  return (
    <div className="bg-primary w-full h-16">

    <div className="flex items-stretch justify-center text-white w-full h-16 px-6">
    <div className="flex items-center">
        <img src={image} alt="Logo" className="h-8 w-8 mr-2" />
        <div className="text-xl font-bold">Formify</div>
    </div>
    <div className="flex items-center ml-auto">
        <a href="#" className="mx-4 text-sm hover:text-blue-500">Features</a>
        <a href="#" className="mx-4 text-sm hover:text-blue-500">Pricing</a>
        <a href="#" className="mx-4 text-sm hover:text-blue-500">Contact</a>    
        <a href="#" className="mx-4 text-sm hover:text-blue-500">Login</a>    
        <button className="bg-transparent text-white rounded ml-4 border border-blue-500 h-6 text-sm hover:bg-blue-400">Create Account</button>

    </div>

    </div>
    </div>
  );
}