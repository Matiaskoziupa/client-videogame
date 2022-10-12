
import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogames, getGenres } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Create.css"


export default function Create() {


    // Validates 

    function validate() {
        let errors = {};
        if(!input.name || input.title?.name < 1 || input.name?.includes("<") || input.name?.includes(">") || input.name?.includes("@")) errors.name = "Debes ingresar un titulo sin caracteres especiales."
    
        //La descripción no puede ser: Menor a 50 caracteres, tener menos de 5 palabras, ni incluir caracteres peligrosos.
        if(!input.description || input.description?.length < 50 || input.description?.split(" ").length <= 5 || input.description?.includes("<") || input.description?.includes(">") || input.description?.includes("@")) errors.description = "Debes ingresar una descripcion de al menos 50 caracteres con más de 5 palabras, sin caracteres especiales."
        
        //Al menos un genero es necesario.
        if(input.genres?.length < 1) errors.genres = "Debes seleccionar al menos un genero."
        
        //Al menos una plataforma es necesaria.
        if(input.platforms?.length < 1) errors.platforms = "Debes ingresar al menos una plataforma."
        
        //El rating no puede ser mayor a 5 ni menor a 0.
        if(input.rating>5 || input.rating < 0) errors.rating = "El valor debe estar dentro del rango de 0-5"
        
        return errors
    }





    // Validates 

    const dispatch = useDispatch()
    const genre = useSelector(state => state.genres)
    //  console.log(diet)
    let history = useHistory();
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name:"",
        released:"",
        rating:"",
        description:"",
        background_image:"",
        platforms:[],
        genres:[],
    })

    const handleChange = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
        //  console.log(input)
    }

    const handleSelect = (e) => {

        if (input.genres.includes(e.target.value)) {
            return "Genre Type exists"
        } else {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
        setErrors(validate({
            ...input,
            [e.target.value]: e.target.value
        }))
        //  console.log(input)
    }


    const handleDeleteGenres = (el) => {
        setInput({
            ...input,
            genres: input.genres.filter(e => e !== el)
        })
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(input));
        const errorSave = validate(input);
        if (Object.values(errorSave).length !== 0) {
            alert("The videogame is not created, fill in the required fields!")
        } else {
            dispatch(postVideogames(input))
            alert("Videogame created successfully")
            setInput({
                name:"",
                released:"",
                rating:"",
                description:"",
                background_image:"",
                platforms:[],
                genres:[],
            })
            history.push("/home")
        }




    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    let platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo",
    ];
   
    function handleChangePlatforms(e){
        const platforms=input.platforms.includes(e.target.value) ?
        alert("Equal platforms cannot be added") :
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value] 
        })
    }
    function handleDeletePlatforms(e){
        // e.preventDefault()
        setInput({
            ...input,
            platforms:  input.platforms.filter(s => s !== e) 
        });
        console.log(input)
    }
    return (
        <div className={styles.modalContainer}>
            <form className={styles.formContainer} action="" onSubmit={(e) => handleSubmit(e)} >
            <div className={styles.btnContainer}>
            <Link to="/home" className={styles.btnIcon} >
                <span>back</span>
            </Link>
            </div>
            <div>
          <h3 className={styles.formTitle}>New Game</h3>
          <div className={styles.inputsContainer}>
            <div className={styles.labelInput}>
                <label htmlFor="">URL Img</label>
                
                    <input 
                        className={
                            !input.background_image ? styles.input : styles.inputOk
                          }
                        type="text"
                        value={input.background_image}
                        name="background_image"
                        onChange={handleChange}
                    />
                    </div>
                    {
                        errors.background_image && (
                            <p className={styles.error}>{errors.background_image}</p>
                        )
                    }

                <div className={styles.labelInput}>
                <label htmlFor="">name</label>
                
                    <input className={errors.name ? styles.input : styles.inputOk}
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                    </div>
                    {
                        errors.name && (
                            <p className="error">{errors.name}</p>
                        )
                    }
               
               <div className={styles.labelInput}>
                <label htmlFor="">released</label>
                    <input className={errors.released ? styles.input : styles.inputOk}
                        type="text"
                        value={input.released}
                        name="released"
                        onChange={handleChange}
                    />
                    </div>
                    {
                        errors.released && (
                            <p className={styles.error}>{errors.released}</p>
                        )
                    }
                
                <div className={styles.labelInput}>
                <label htmlFor="">description</label>
                
                    <input className={!input.description ? styles.input : styles.inputOk}
                        type="text"
                        value={input.description}
                        name="description"
                        onChange={handleChange}
                    />
                    </div>
                    {
                        errors.description && (
                            <p className={styles.error}>{errors.description}</p>
                        )
                    }
                
                <div className={styles.labelInput}>
                <label htmlFor="">rating</label>

                    <input className={styles.error}
                        type="number"
                        value={input.rating}
                        name="rating"
                        placeholder="0-5"
                        min="1"
                        max="5"
                        onChange={handleChange}
                    />
                    </div>
                    {
                        errors.rating && (
                            <p className={styles.error}>{errors.rating}</p>
                        )
                    }
                <div className={styles.genrePlatform}>
              <div className={styles.labelInputGenrePlatform}></div>
                <label>Genres:</label>
                    <select className={errors.genres ? styles.input : styles.inputOk} onChange={handleSelect}>
                        <option value={input.genres} name="type">Genre..</option>
                        
                        {
                            genre && genre.map(c => {
                                return (

                                    <option key={c.id} value={c.name}>{c.name}</option>

                                )
                            })
                        }

                    </select>
                    


                    {
                        errors.genres && (
                            <p className={styles.error}>{errors.genres}</p>
                        )
                    }
            
                {input.genres.map((el) => (
                    <div key={el} className={styles.selectContainer}>
                        <span >{el}</span >
                        <button className={styles.btnSelect} onClick={() => handleDeleteGenres(el)}> x </button>
                    </div>
                ))}
                </div>
                <div className={styles.labelInputGenrePlatform}>
                    <label> Platforms:</label>
                    <select className={errors.platforms ? styles.input : styles.inputOk} required name="platforms"  onChange={(e) => handleChangePlatforms(e)}>
                    <option hidden={true}>Select some platforms</option>
                    {platforms.map(pl => <option value={pl}>{pl}</option>)}
                    </select>
                    {
                        errors.platforms && (
                            <p className={styles.error}>{errors.platforms}</p>
                        )
                    }
                    <div>
                {input.platforms.map((el) => (
                    <div key={el} v>
                        <span >{el}</span >
                        <button className={styles.btnSelect} onClick={() => handleDeletePlatforms(el)}> x </button>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </div>
<button className={styles.btnSubmit} type="submit" onSubmit={handleSubmit}>Crear</button>

</form>
</div>

    );
};
