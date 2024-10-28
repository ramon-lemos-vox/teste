

// ------------------------------------------------------------------------------------------------------------
const HelperApp = {
    startBots: async () => {
        try {
            console.log("Sistema iniciado com sucesso!");
        } catch (error) {
            console.error("Erro ao carregar bots:", error);
        }
    },

    authenticateToken: async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res.send({ error: "Acesso não autorizado" });
            }

            if (token !== process.env.API_SECRET_KEY) {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
                const { user } = decoded;
                req.user = user;
                next();
                return;
            }

            return res.send({ error: "Acesso não autorizado" });
        } catch (error) {
            console.error("Erro durante autenticação:", error);
        }
    },



    // ///-----------------------------------------------------------------------------------------------------------------------
};
module.exports = HelperApp;

