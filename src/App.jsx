import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router}></RouterProvider>
    </RecoilRoot>
  );
}

export default App;
