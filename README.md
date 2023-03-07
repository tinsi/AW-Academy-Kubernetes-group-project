# Full stack Kubernetes group project
*Week 7 project for AW Academy's AWS Developer Programme*

## Requirements
* Build a Kubernetes cluster into AWS's Elastic Kubernetes Service
* The resources for the Kubernetes cluster must be built declaratively using a yaml-template
* Publish a highly available full stack application in the cluster with a separate backend and frontend
  * app template from here: https://github.com/academygit/ExpressMySQL
* The app template uses MySQL for the database, the code should be refactored for PostgreSQL

## Result
The Kubernetes cluster was deployed with a NodePort instead of a LoadBalancer, so it is unfortunately not highly available. Otherwise we reached the project goals. The frontend was also edited to make the app look a little prettier. 🐳
