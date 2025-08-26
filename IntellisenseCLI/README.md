# Intellisense Command Line Interface

A minimal CLI version of my VS Code extension that generates local TypeScript
definitions for ServiceNow (tables, fields, GlideRecord helpers) **without**
installing extra extensions or storing credentials on disk. Uses PowerShell on
Windows to prompt for your instance password at run time.

I'm trying to keep the powershell script as brief as possible so that even System Administrators that don't have experience with shell scripting would understand there's no hidden attempts or anything.

# Prerequisites
    - Node LTS

# Usage

either copy the JS and PS1 scripts to your directory OR copy them somewhere and set up an environment variable to your directory, now GenerateIntellisense.ps1 (Or however else you'd want to rename it to) will be accessible in all of your projects.

## 1. Initiate a project (in cases that your extension(s) don't do that for you) - Can skip if package.json is present in your project root directory.

```
npm init --y
```

### Then edit the package.json to add the following change 

```
{
    ...,
    type: "module",
    ...
}
```

## 2. Create an <b> instance.json </b> file in your project root directory.

```
{
    "instance": "dev12412412",
    "username": "admin"
}
```

## 3. Copy tsconfig.json to your project root directory 
This is done so that VSCode knows to give you code autocompletion based on the .d.ts files in your directory.
You can try to play around with it if you want, this is just the config that I was able to find out works from personal experience.

## 4. Run the script

```
    .\GenerateIntellisense.ps1
```


## 5. You'll be prompted for a password for the instance

This will happen every time you're generating intellisense, due to security considerations like mentioned above. The exporting should take around 10-90 based on how many custom fields you have in your instance, if you think you can afford increase the requests frequency, go ahead, the current numbers have been accustomed again, based on personal experience for most optimized experience.

## 6. You can find your generated script in \lib\dts\con.d.ts

The reason for having previously chosen this file extension - no native Windows implementation was supporting opening such files as files that have the name 'con' are deemed system ones, but on the other end were too big for VSCode as an open file, but had no issue to be used for the Language Server.


### Now all internal ServiceNow intellisense should be working, GlideRecord, table autocompletion, field autocompletion, overall everything that you would have been able to find in my extension on the VSCode Marketplace. 

If necessary I'll be providing further documentation and updates on this as I'm slowly reintroducing the extension's source code with the newer local features.