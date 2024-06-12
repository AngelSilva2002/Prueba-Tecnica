import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    const { email, password, username, python, java, js, C, Cplus } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json(["The email already exists"]);
        }

        // Generar el enlace de la imagen de RoboHash con un número aleatorio del 1 al 30
        const randomNumber = Math.floor(Math.random() * 30) + 1;
        const imageUrl = `https://robohash.org/${randomNumber}.png`;

        // Establecer los valores de los lenguajes de programación en 0 si están vacíos o no se proporcionan
        const pythonValue = python || 0;
        const javaValue = java || 0;
        const jsValue = js || 0;
        const CValue = C || 0;
        const CplusValue = Cplus || 0;

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            image: imageUrl,
            python: pythonValue,
            java: javaValue,
            js: jsValue,
            C: CValue,
            Cplus: CplusValue
        });
    
        const userSaved = await newUser.save();

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            create: userSaved.createdAt,
            image: userSaved.image, // URL de la imagen de avatar generada dinámicamente
            python: userSaved.python,
            java: userSaved.java,
            js: userSaved.js,
            C: userSaved.C,
            Cplus: userSaved.Cplus
        });

    } catch (error) {
        console.error(error);
        res.status(500).json(["Server error"]);
    }
};

export const login  = async (req, res) => {
    const{email, password } = req.body

    try {

        const UserFound = await User.findOne({email})
        if(!UserFound) return res.status(400).json({message: "User Not Found"})
        
        const isMatch = await bcrypt.compare(password, UserFound.password)

        if(!isMatch) return res.status(400).json({message: "Not Password"})

        res.json({
            id: UserFound._id,
            username: UserFound.username,
            email: UserFound.email,
            create: UserFound.createdAt
        })


    } catch (error) {
        console.log(error)
    }


}



export const profile  = async (req, res) => {
    const{id} = req.body

    try {

        const UserFound = await User.findOne({ _id: id });
        console.log(id)

        if(!UserFound) return res.status(400).json({message: "User Not Found"})
        

        res.json({
            id: UserFound._id,
            username: UserFound.username,
            email: UserFound.email,
            create: UserFound.createdAt,
            image: UserFound.image, 
            python: UserFound.python,
            java: UserFound.java,
            js: UserFound.js,
            C: UserFound.C,
            Cplus: UserFound.Cplus
        })


    } catch (error) {
        console.log(error)
    }


}