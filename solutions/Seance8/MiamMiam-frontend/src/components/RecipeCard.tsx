
interface RecipeCardProps {
    title: string;
    imageUrl: string;
    duration: number;
    difficulty: number;
    description?: string; // nombre de 1 à 5
}

const RecipeCard = ({ title, imageUrl, duration, difficulty,description }: RecipeCardProps) => {
    return (
        
        <div className="recipe-card">
            <h2>{title}</h2>
            <img
                src={imageUrl}
                alt={title}
                style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
            
            {description && <p>{description}</p>}
            <p>
                Durée : {duration} minutes
            </p>
            <p>
                Difficulté : {difficulty}/5
            </p>
        </div>
    );
};

export default RecipeCard;