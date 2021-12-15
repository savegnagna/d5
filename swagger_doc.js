
// Strutura di un utente
/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - name
 *        - surname
 *        - birth
 *        - email
 *        - number
 *        - password
 *        - payment
 *        - holder
 *        - number
 *        - MM
 *        - AA
 *        - CVV
 *        - job
 *      properties:
 *        name:
 *          type: string
 *          descroption: Nome
 *        surname:
 *          type: string
 *          descroption: Cognome
 *        birth:
 *          type: string
 *          descroption: Data di nascita
 *        email:
 *          type: string
 *          descroption: Email per il login
 *        number:
 *          type: number
 *          descroption: Numero di telefono
 *        password:
 *          type: string
 *          descroption: Password del utente
 *        payment: 
 *          type: object
 *          properties:
 *            holder:
 *              type: string
 *              descroption: Nome del possesore della carta
 *            card_number:
 *              type: number
 *              descroption: Numero della carta di credito presente sulla parte frontale
 *            MM:
 *              type: number
 *              descroption: Mese di scadenza delle carte di debito o di debito
 *            AA:
 *              type: number
 *              descroption: Anno di scadenza delle carte di debito o di debito
 *            CVV:
 *              type: number
 *              descroption: Codice di sicurezza presente sulle carte di debito o di credito
 *        
 *        job:
 *          type: string
 *          descroption: Ruolo del utente al interno del applicazione
 * 
 *    coupon:
 *      type: object
 *      require:
 *        - email
 *        - coupons
 *        - expire
 *        - amount
 *        - code
 *      properties:
 *        email:
 *          type: string
 *          descroption: asd
 *        coupons:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              expire:
 *                type: string
 *                descroption: asd
 *              amount:
 *                type: number
 *                descroption: asd
 *              code:
 *                type: number
 *                descroption: asd
 */



/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Login api
 */

