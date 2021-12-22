
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
 *          description: Nome
 *        surname:
 *          type: string
 *          description: Cognome
 *        birth:
 *          type: date
 *          description: Data di nascita
 *        email:
 *          type: string
 *          description: Email per il login
 *        number:
 *          type: number
 *          description: Numero di telefono
 *        password:
 *          type: string
 *          description: Password del utente
 *        payment: 
 *          type: object
 *          properties:
 *            holder:
 *              type: string
 *              description: Nome del possesore della carta
 *            card_number:
 *              type: number
 *              description: Numero della carta di credito presente sulla parte frontale
 *            MM/AAAA:
 *              type: month
 *              description: Mese e anno di scadenza della carta di debito o di debito
 *            CVV:
 *              type: number
 *              description: Codice di sicurezza presente sulla carta di debito o di credito
 *        
 *    Job:
 *          type: string
 *          description: Ruolo del utente al interno del applicazione
 * 
 *    Coupon:
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
 *          description: asd
 *        coupons:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              expire:
 *                type: string
 *                description: Data di scadenza del coupone
 *              amount:
 *                type: number
 *                description: sconto che aplicera al pagamento
 *              code:
 *                type: number
 *                description: numero identificativo riutilizabile del cupone
 */

