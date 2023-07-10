import "../componentsStyle/SquaresStlyes.css";
import SquaresData from "./SquareData";
import card1 from "../assents/card1.jpg"
import card2 from "../assents/card2.jpg"
import card3 from "../assents/card3.jpg"


function Squares(){
    return(
        <div className="square">
            <h1>Beneficios de Donar</h1>
            <p1>Son muchos los beneficios que 
            se encuentran al momento de donar</p1>
            <div className="squarecard">
                <SquaresData

                    image={card1}
                    heading="Evaluación médica gratuita"
                    text="Antes de donar sangre, se realiza una evaluación médica completa que incluye pruebas de detección de enfermedades infecciosas. Esta evaluación médica proporciona información valiosa sobre tu estado de salud, ya que se llevan a cabo pruebas para detectar enfermedades como hepatitis, VIH y otras infecciones transmitidas por la sangre. Además, esta evaluación médica brinda la oportunidad de realizar un chequeo general de tu salud de manera gratuita."
                />
                
                <SquaresData

                    image={card2}
                    heading="Examen de sangre completo"
                    text="Durante el proceso de donación, se realizan pruebas 
                    de laboratorio en tu muestra de sangre para determinar tu 
                    tipo de sangre, tu nivel de hemoglobina y otros parámetros. 
                    Estos resultados pueden darte una idea de tu estado de salud 
                    general, como los niveles de hierro en tu sangre. Si se detecta alguna anomalía,
                    se te puede recomendar que busques atención médica adicional."
                />

                <SquaresData

                    image={card3}
                    heading="Estímulo para la producción de sangre fresca"
                    text=" Después de donar sangre, el cuerpo trabaja para
                    reemplazar las células sanguíneas perdidas. Esto estimula 
                    la médula ósea para que produzca nuevas células sanguíneas 
                    frescas. Como resultado, tu sangre puede volverse 
                    más eficiente en la entrega de oxígeno a los tejidos y órganos."
                />
                
            </div>
        </div>
    )
}

export default Squares;

