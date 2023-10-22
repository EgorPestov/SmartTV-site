import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MainPage } from '../../pages/main-page/main-page';

export const App = () => (
  <Routes>
    <Route
      path={AppRoute.Root}
      element={<MainPage />}
    />
  </Routes>
)

