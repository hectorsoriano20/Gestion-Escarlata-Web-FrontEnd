import v1Image from "../assents/1ra.png"
import v2Image from "../assents/VvCopia.jpg"
import v3Image from "../assents/home4.jpg"
import v4Image from "../assents/home5.jpg"
import "../componentsStyle/InterstingStyle.css"
import InterData from "./InterData"

const Intersting = () => {
    return(
        <div className="Intersting">
            <h1>El cambio comienza aquí.</h1>
            <p>Donar puede ayudar a miles de personas.</p>
            <InterData
            className="first-des"
                heading = "Marca la diferencia"
                text="La donación de sangre puede marcar la diferencia 
                entre la vida y la muerte para alguien que necesita una
                transfusión. Tu donación podría ayudar a una persona que
                se encuentra en una situación de emergencia, como víctimas 
                de accidentes automovilísticos, pacientes con cáncer, personas 
                sometidas a cirugías complejas o mujeres con complicaciones durante 
                el parto. Al donar sangre, 
                puedes contribuir directamente a salvar vidas."
                imag1 = {v1Image}
                imag2 = {v2Image}
            />     
            <InterData
            className="first-des-reverse"
                heading = "Alguien necesita sangre"
                text=" En muchos lugares del mundo, hay una constante escasez de sangre 
                debido a la falta de donantes. La demanda de sangre es alta y continua, y 
                donar sangre regularmente ayuda a mantener los niveles de suministro y a 
                garantizar que haya suficiente sangre disponible para quienes la necesitan. 
                Tu donación podría ser la diferencia entre alguien que recibe o no la atención 
                médica adecuada."
                imag1 = {v4Image}
                imag2 = {v3Image}
            />     
        </div> 
    )
}

export default Intersting