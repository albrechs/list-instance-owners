# list-instance-owners
## Description
This is a command line tool that will list the InstanceID, Owner, Instance Type, and Launch Time of all instances in a given region (default is us-west-2).

## Installation
* Clone this repository
* cd into the list-instance-owners directory
* run `sudo npm link` to install dependencies and add to your PATH

## Usage
#### Default Region (us-west-2)
`list-instance-owners`

#### Using the Region Flag
`list-instance-owners -r <region>`

`list-instance-owners --region <region>`

#### Authentication
list-instance-owners will use the credtials stored in ~/.aws/credentials for the active AWS profile or role based authentication