import { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import ButtonC from "@/components/ButtonC";
import { Link, NavLink } from "react-router-dom";
import { items } from "@/data/survey-data-items";
import { ReactFormBuilder } from 'react-form-builder2';
import { sbInsert } from "@/services/ApiService";
import 'react-form-builder2/dist/app.css';
import { useSelector, useDispatch } from 'react-redux';
 
var surveyData;

export function SurveyForm() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const authUser = useSelector((state) => state.auth.user)

  const handleChange = (data) => {
    console.log(data);
    surveyData = data;
  }

  const handleSubmit = () => {
    if(surveyData) {
      const insertData =  {
        createdby: authUser.id, 
        surveydata: surveyData['task_data'],
      };
      setLoading(true);
      sbInsert('survey', insertData).then(({error, data}) => {
        if(error) {
          alert("Error")
          console.log(error)
        }
        if(data) {
          alert("Survey Created. The Preview of the survey is still in development process. We are really thankfull for your patience.")
        }
        setLoading(false);
      })
    }else {
      alert("Please create a survey")
    }
  };
     
  return (
    <div className="mt-12">
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Typography
            variant="h6"
            color={"blue-gray"}
          >
            {'Project - ALPHA'}
          </Typography>
        </Link>
        <div className="flex items-center gap-4 py-6 px-8 justify-end"> 
          <ButtonC 
            type="submit"
            variant="outlined" 
          >
            Cancel
          </ButtonC>
          <ButtonC 
            type="submit"
            loading={loading}
            variant="gradient" 
            onClick={handleSubmit}
          >
            Submit
          </ButtonC>
        </div>
        <ReactFormBuilder
            edit
            onPost={handleChange}
            toolbarItems={items}
        />
    </div>
  );
}

export default SurveyForm;
