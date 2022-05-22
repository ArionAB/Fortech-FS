import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header/header";
import { url } from "../../components/shared";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReactComponent as Add } from "../../assets/add.svg";

import "./Student.scss";

const classes = [
  {
    name: "Biology",
  },
  {
    name: "Geography",
  },
  {
    name: "Math",
  },
  {
    name: "History",
  },
  {
    name: "Chemistry",
  },
  {
    name: "Art",
  },
];
const localemail = localStorage.getItem("email");

const Student = () => {
  const [className, setClassName] = useState("");
  const [mark, setMark] = useState("");
  const [grades, setGrades] = useState([]);
  const [average, setAverage] = useState<Number[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!localemail) {
      alert("You need to be logged in to acces this data!");
      navigate("/");
    }
    getGrades();
  }, []);

  useEffect(() => {
    console.log(average);
    getAverage();
  }, [grades]);

  const getGrades = () => {
    axios
      .post(`${url}/grades/get`, {
        id: id,
      })
      .then((res) => {
        console.log(res);
        setGrades(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getAverage = () => {
    let averageArr: any[] = [];

    classes.map((clasa: any) => {
      grades?.map((mark: any) => {
        if (clasa.name === mark.className) {
          averageArr.push({
            name: mark.className,
            grades: parseInt(mark.grades),
          });
        }
      });
    });

    let myObj: { [index: string]: any } = {};
    averageArr.forEach(function (x: any) {
      myObj[x.name] = (myObj[x.name] || 0) + 1;
    });

    const entries = Object.entries(myObj);

    const res: any[] = [
      ...averageArr
        .reduce((map, current) => {
          const { name } = current;
          const grouped = map.get(name);
          if (!grouped) {
            map.set(name, { ...current });
          } else {
            map.set(name, {
              ...grouped,
              grades: grouped.grades + current.grades,
            });
          }
          return map;
        }, new Map())
        .values(),
    ];
    let finalAverage: any[] = [];
    entries.map((entry) => {
      res.map((r) => {
        if (entry[0] === r.name) {
          const res = [r.grades / entry[1]];
          finalAverage.push(res);
        }
      });
    });
    setAverage(finalAverage);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(`${url}/grades`, {
        userID: id,
        className: className,
        grades: mark,
      })
      .then((res) => {
        getGrades();
        getAverage();
        setClassName("");
        setMark("");
      })
      .catch((err) => console.error(err));
  };
  average.map((a: any) => {
    console.log("average[0]", a[0]);
  });

  return (
    <>
      <Header />
      <div className="table">
        <ul className="table-headings">
          <li>Class</li>
          <li>Grades</li>
          <li>Average</li>
        </ul>
        {classes.map((clasa, index) => {
          return (
            <>
              <div className="each-class" key={index}>
                <div className="class-add">
                  <h3>{clasa.name}</h3>
                  <label>
                    <input
                      type="text"
                      onChange={(e) => {
                        setMark(e.target.value);
                        setClassName(clasa.name);
                      }}
                    />
                  </label>
                  {average?.map((avg: any) => (
                    <p>{avg[1]}</p>
                  ))}
                  <Add
                    className="add-grade"
                    onClick={(e) => {
                      handleSubmit(e);
                      setMark("");
                    }}
                  />
                </div>
                {grades?.map((grade: any) => {
                  return grade.className === clasa.name ? (
                    <p
                      className="each-grade"
                      style={
                        grade.grades >= 5
                          ? { color: "green" }
                          : { color: "red" }
                      }
                    >
                      {grade.grades}
                    </p>
                  ) : (
                    ""
                  );
                })}
              </div>
            </>
          );
        })}
        {
          <div className="average">
            {average.map((a: any) => (
              <p style={a[0] >= 5 ? { color: "green" } : { color: "red" }}>
                {(Math.round(a[0] * 100) / 100).toFixed(2)}
              </p>
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default Student;
