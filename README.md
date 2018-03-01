# list-instance-owners
## Description
This is a command line tool that will list the InstanceID, Owner, Instance Type, and Launch Time of all instances in a given region (default is us-west-2).

## Installation
* Clone this repository
* cd into the list-instance-owners directory
* run `sudo npm link` to install dependencies and add to your PATH

## Usage
#### Default Options (Region = us-west-2 & Tag = Owner)
`list-instance-owners`

#### Using the Region Flag
`list-instance-owners -r <region>`

`list-instance-owners --region <region>`

#### Using the Tag Flag
`list-instance-owners -t <tag>`

`list-instance-owners --tag <tag>`

#### All Together Now!
`list-instance-owners -r us-west-2 -t Owner` (defaults)

`list-instance-owners -r us-east-1 -t Name` (Queries the Name tag of instances in us-east-1)

#### Authentication
list-instance-owners will use the credtials stored in ~/.aws/credentials for the active AWS profile, or role based authentication
