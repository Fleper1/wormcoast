import TaskPage from "../pages/taskPage";
import ResultImage from "../pages/ResultImage";

export const Router = [
    {path: "/", element: <TaskPage/>},
    {path: "/result", element: <ResultImage/>}
];