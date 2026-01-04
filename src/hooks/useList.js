import { useState, useEffect } from "react";
import { supabase } from "../api/supabase";

function useList() {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");

  //READ
  const fetchList = async () => {
    const { data, error } = await supabase
      .from("Todo")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    setList(data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  //ADD
  const addTask = async () => {
    if(!task.trim()) return;
    
    const {error} = await supabase
    .from("Todo")
    .insert([{task}]);

    if(error){
        console.log(error)
        return
    }

    setTask("");
    fetchList();
  };

  //DELETE
  const deleteTask = async (id) => {
    await supabase.from("Todo").delete().eq("id", id);

    fetchList();
  };

  //UPDATE
  const updateTask = async (id) => {
    const newTask = prompt("New Task:");
    if (!newTask) return;

    await supabase.from("Todo").update({ task: newTask }).eq("id", id);

    fetchList();
  };

  return {
    list,
    task,
    setTask,
    fetchList,
    addTask,
    deleteTask,
    updateTask,
  };
}

export default useList;
