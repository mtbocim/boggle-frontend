import React, { useState } from "react";
import { useNavigate, Link} from 'react-router-dom';
import BoggleApi from "../../api";
/**
 * Render JoinLobbyForm.
 *
 * State: formData
 *  {
 *      lobbyName (string),
 *      password (string)
 *  }
 *
 * App -> JoinLobbyForm -> Lobby
 */

function JoinLobbyForm({cancel}:{cancel:Function}) {
    const [formData, setFormData] = useState(
        {
            lobbyName: '',
            password: '',
        }
    );
    const [errorMessages, setErrorMessages] = useState<Array<string>>([]);
    const navigate = useNavigate();
    console.log("what is formData?", formData)

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        console.debug("Entered handle submit");
            const result = await BoggleApi.authenticateLobbyCredentials(formData);
            console.log(result);
            if(result.error){
                setErrorMessages(()=>[result.error])
            }else{
                navigate(`/lobby/${result.authentication.lobbyName}`);
            }
         
    }


    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value,
         }));
    }

    function cancelForm(){
        cancel()
    }

    return(
        <div className='JoinLobbyForm'>
            <p>Join a lobby!</p>
            <div>
                {errorMessages.map((msg, i)=><h1 key={i}>{msg}</h1>)}
            </div>
            <div>
                <button onClick={cancelForm}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='JoinLobbyForm-lobbyName'>
                    <label>
                        Lobby Name
                        <input
                            type="text"
                            value={formData.lobbyName}
                            name="lobbyName"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="text"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button onSubmit={handleSubmit}>
                        Join lobby!
                    </button>
                </div>
            </form>
        </div>
    )
}

export default JoinLobbyForm;