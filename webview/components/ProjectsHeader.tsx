import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProjectAction, deleteProjectAction } from '../actions/projectActions';
import { RootState } from '../reducers/rootReducer';

export const ProjectsHeader: React.FC = function () {
  const [input, setInput] = useState('');
  const [selection, setSelection] = useState('');
  const dispatch = useDispatch();
  const selector = (state: RootState) => state.userData;
  const userData = useSelector(selector);

  const handleProjectAddition = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (input) dispatch(addProjectAction(input.trim()));
    setInput('');
  };

  const handleProjectDeletion = function (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const projectId = selection;
    if (projectId) dispatch(deleteProjectAction(projectId));
  };

  return (
    <div id="projectsHeader-container">
      <form onSubmit={(e) => handleProjectAddition(e)}>
        <label>add new project</label>
        <input
          type="text"
          value={input}
          placeholder="create a new project"
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <button type="submit">submit new proj</button>
      </form>

      <form
        onSubmit={(e) => {
          handleProjectDeletion(e);
        }}
      >
        <label>delete a project</label>
        <select onChange={(e) => setSelection(e.target.value)} defaultValue="default">
          <option value="default" disabled hidden>
            select project
          </option>
          {userData.map((proj) => (
            <option value={proj._id} key={proj._id}>
              {proj.projectName}
            </option>
          ))}
        </select>
        <button type="submit">submit project deletion</button>
      </form>
    </div>
  );
};