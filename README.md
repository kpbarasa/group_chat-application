# group_chat-application
group chat application 
### Online shopping store
Online Shopoping Store Nodejs Microservices RPC CI CD
* Storage: Amazon S3 Bucket
* Deployment: Docker, Amazon Elastic  BeanstalkMEssaging Rabbit MQ
* Error Handdling: Sentry 

### Features:
 #### 1. Single chat
 #### 2. Group chat
 #### 3. Upload media (images, audio, video)
---
### **Dependencies:**
   * express
   * nodemon (dev dependency)
   * amqplib
   * axios
   * bcrypt
   * cookie-parser
   * cors
   * dotenv
   * jsonwebtoken
   * mongoose
   * stripe
   * winston


### **Git Ignore:**
*   /server/node_modules
*   .env./checkout/node_modules
*   ./checkout/.env
*   ./customer/node_modules
*   ./customer/.env
*   ./products/node_modules
*   ./products/.env
*   ./shopping/node_modules
*   ./shopping/.env

### .env(Environment file)
```

NODE_ENV="DEVELOPMENT"
APP_SECRET =''

# Mongo DB
MONGODB_URI=''

# Port
PORT=''

# Message broker 
### Virtualhost
MESSAGE_BROKER_URL=''
CLOUDAMQP_URL=''

# Stripe
STRIPE_PRIVATE_KEY=''
CLIENT_URL=''

# Safaricom 
SAFARICOM_ACCESS_TOKEN='' 
SAFARICOM_CLIENT_URL=''
```

