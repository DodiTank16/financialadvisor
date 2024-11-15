import { Navigate, useRoutes } from 'react-router-dom';
// auth
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';

import {
  LoginPage,
  Page404,
  SubCategoryPage,
  CategoryPage,
  RegisterPage,
  FaqPage,
  PrivacyPage,
  TermsPage,
  UserPage,
  FinancialAdvisorsPage,
  ProductsPage,
  AppointmentsPage,
  AppointmentsFinancialAdviserPage,
  Homepage,
} from './elements';
import PublicRoutes from '../Routing/PublicRoutes';
import RoleBasedRoute from '../Routing/RoleBasedRoute';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: 'login',
          element: (
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          ),
        },
        {
          path: 'register',
          element: (
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          ),
        },
        {
          path: 'home',
          element: (
            <PublicRoutes>
              <Homepage />
            </PublicRoutes>
          ),
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <RoleBasedRoute roles={['Admin']}>
          <DashboardLayout />
        </RoleBasedRoute>
      ),
      children: [
        {
          path: 'user',
          children: [
            {
              element: <Navigate to="/dashboard/user/SubCategory" replace />,
              index: true,
            },
            { path: 'Category', element: <CategoryPage /> },
            { path: 'SubCategory', element: <SubCategoryPage /> },
            { path: 'Faq', element: <FaqPage /> },
            { path: 'Privacy', element: <PrivacyPage /> },
            { path: 'Terms', element: <TermsPage /> },
            { path: 'User', element: <UserPage /> },
            { path: 'FinancialAdvisors', element: <FinancialAdvisorsPage /> },
            { path: 'Products', element: <ProductsPage /> },
            { path: 'Appointments', element: <AppointmentsPage /> },
          ],
        },
      ],
    },
    {
      path: '/FinancialAdviserDashboard',
      element: (
        <RoleBasedRoute roles={['FinancialAdviser']}>
          <DashboardLayout />
        </RoleBasedRoute>
      ),
      children: [
        {
          path: 'FinancialAdviser',
          children: [
            {
              element: (
                <Navigate to="/FinancialAdviserDashboard/FinancialAdviser/Appointments" replace />
              ),
              index: true,
            },
            { path: 'Appointments', element: <AppointmentsFinancialAdviserPage /> },
          ],
        },
      ],
    },
    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
