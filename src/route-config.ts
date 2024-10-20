import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import IndexStatistics from "./components/statistics/IndexStatistics";
import Home from "./components/home/Home";
import CreateNotebook from "./components/notebooks/CreateNotebook";
import EditNotebook from "./components/notebooks/EditNotebook";
import IndexNotebooks from "./components/notebooks/IndexNotebooks";
import CreateTrack from "./components/tracks/CreateTrack";
import EditTrack from "./components/tracks/EditTrack";
import IndexTracks from "./components/tracks/IndexTracks";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";
import UserDetails from "./components/user/UserDetails";
import Settings from "./components/settings/settings";
import SearchResults from "./components/search/SearchResults";
const routes = [

    { path: '/register', component: Register },
    { path: '/login', component: Login },

    { path: '/tracks', component: IndexTracks, exact: true, isAdmin: true },
    { path: '/tracks/create', component: CreateTrack, isAdmin: true },
    { path: '/tracks/edit/:id(\\d+)', component: EditTrack, isAdmin: true },

    { path: '/notebooks', component: IndexNotebooks, exact: true, isAdmin: true },
    { path: '/notebooks/create', component: CreateNotebook, isAdmin: true },
    { path: '/notebooks/edit/:id(\\d+)', component: EditNotebook, isAdmin: true },

    { path: '/statistics', component: IndexStatistics, exact: true, isAdmin: true },
    { path: '/user-details', component: UserDetails },
    { path: '/settings', component: Settings },
    { path: '/search-results/:term', component: SearchResults },
    { path: '/', component: Home, exact: true },
    { path: '*', component: RedirectToLandingPage }
]

export default routes;