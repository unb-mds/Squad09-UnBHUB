import SignInCardComponent from '../components/SignInCard';

export default function SignInScreens() {
  return (
    <div>
      <div
        className="flex bg-center w-full h-screen absolute"
        style={{
          backgroundImage: "url('public/images/imagemlogin.jpg')",
        }}
      ></div>
      <SignInCardComponent />
    </div>
  );
}
