title: Password management in your head
summary: Ditch OnePass or LastPass and start using an analog system
date: 2016-12-26 17:03:49
published: false
tags:
---

# Password Management in Your Head

The most secure way to manage your passwords is in your head, using a different password for every service. This seems impossible at first glance, but can actually be done very easily by following a set of algorithms that you only need to memorize once.

With this scheme, you only need to memorize two things:
- Your master passphrase
- The algorithm you use to generate new passphrases

1. Choose a "master key" pass phrase that is at least 7 characters and has the usual good password practices
- At least 7 characters
- At least one capital letter 
- At least one number
- At least one special character
- Do not use any common english words

Ideas about how to generate your master key
- Take an english word or two-word phrase, translate it into another language, and then write it phonetically in english. Capitalize some characters and insert special characters, numbers, and spaces.
- Create an acronym or 

This master passphrase will be difficult to memorize, and you may have to type it many times before it's in your head. But the upside is you only need to memorize it once, as you will use it to generate all future passphrases.

## Generating Passphrases for Each of Your Accounts

After you've created your master passphrase and committed it to memory, now you need come up with a secret algorithm that you will use to generate unique passphrases for individual accounts.

1. Choose a place in your master passphrase to split it in two. For example, it may be after the 4th character.
2. You will generate a new secret key for every service you use in your head. You don't need to memorize these service specific keys; you only need to remember the secret algorithim that you use to generate these keys. 
3. Use the common name or domain name of the service as the seed. If this name is ambiguous for an account (or if you have multiple accounts), write down a set of service name -> identifier mappings in a physical notebook (don't put this online). For example, if you have two Google accounts, you may have "google personal -> google personal, google work -> google work".
4. Pick at least 2 rules that you use to modify the name of the service to generate a key name for that service.

Examples of rules could be:
- Add an asterisk at the end
- Capitalize the last letter
- turn all s's into 5's
- add an exclamation between the first and second characters

Using 2-4 of these rules is ideal

An example master key is: `h4k!**Pln#t!`

Here I've taken a simple phrase - "hack the planet" - and messed it up into some numbers, special characters, and caps. 

I've chosen the spot after 6th character (in-between the two asterisks), as the place where I'll insert my service-specific keys

The service-name-to-key algorithim I've chosen has 3 rules:
- reverse it
- capitalize all vowels

So, given a service like 'facebook', I will generate this password: `h4k!*E cAf*Pln#t!`

And, given another service like 'twitter', the password becomes: `h4k!*t Iwt*Pln#t!`

The attacker would have to discover your main key, plus your service key algorithim, plus the location where you intersperse your service key, to gain access to any of your accounts.

With this system, you do not need to memorize separate passphrases for each service, but instead can re-create the passphrase according to your own rules every time you use a service

"bank of america" -> "bank"
"gmail" -> "gmai"
"wells fargo" -> "well"

If your notebook of keys is found, the attacker would not be able to infer your algorithm or know your master key. 
If your password is leaked, say by LinkedIn, it is very unlikely the attacker will be able to infer your master, service key, or the algorithm for your service key.

## Throwaway Accounts

Some accounts for single-use or narrow-use services will not be high priority accounts for privacy or security.

## Changing Your Password

In general, regularly changing passwords on some a is not worth it. 

If, however, any of your passwords are leaked, then start changing all your passwords, Create a new master key, a new service key algorithm, and change all of your accounts, starting with the highest priority like financial and personal communication. You can change accounts as you use them

Reusing a single password for many 

Using a password manager like 1Password or LastPass is convenient, but you are putting your entire digital life in the hands of a private company 


