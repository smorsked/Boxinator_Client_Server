# boxinator

## Install the dev. environment

* Download and install Java runtime from:<br>
   [https://www.java.com/sv/download/](https://www.java.com/sv/download/)<br><br>

* Download and install "Java SE Development Kit 12.0.2" (jdk-12.0.2_windows-x64_bin) from:<br>
   [https://www.oracle.com/technetwork/java/javase/downloads/index.html](https://www.oracle.com/technetwork/java/javase/downloads/index.html)<br><br>

* Download and install "Eclipse Installer 2019-06 R" (eclipse-inst-win64.exe) from:<br>
   [http://www.eclipse.org/downloads/eclipse-packages/](http://www.eclipse.org/downloads/eclipse-packages/)<br><br>

* Download and install "Tomcat 9.0.24" (apache-tomcat-9.0.24.exe) from:<br>
   [https://tomcat.apache.org/download-90.cgi](https://tomcat.apache.org/download-90.cgi)<br><br>
   	-change SHUTDOWN port on the Tomcat9 server to 8015<br><br>

* Download and install *Git* from:<br>
   [https://git-scm.com/](https://git-scm.com//)<br><br>

* Download and install *TortoiseGit* from<br>
   [https://tortoisegit.org/download/](https://tortoisegit.org/download/)<br><br>

 * Download and install *Atom* from<br>
    [https://atom.io//](https://atom.io/)<br><br>

* In order to test a REST API, Install the "Advanced REST client plugin" from chrome web store<br>
   [https://chrome.google.com/webstore/category/extensions](https://chrome.google.com/webstore/category/extensions)<br><br>
   OR<br><br>
   Restlet Client<br>
   [https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm](https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm)<br><br>

 * Download and install *My SQL 8* from:<br>
   https://dev.mysql.com/downloads/mysql/8.0.html<br>
   During installtion set root password to *YellowBanana1!*<br>
   Create a database without any tables (in MySQL Workbech) and name the DB: *boxinator*

* Denna behövs tydligen för eclipse ska fungera med *web grejor* (Eclipse supportar bara version 10, inte 12):<br>
   [https://nodejs.org/en/](https://nodejs.org/en/)<br><br>


**Keep the Tomcat windows service stopped !!!**

<br><br><br>
https://www.codejava.net/frameworks/hibernate/hibernate-one-to-many-association-on-join-table-annotations-example<br>
https://www.codejava.net/frameworks/hibernate/hibernate-one-to-many-association-annotations-example<br>
https://www.baeldung.com/spring-boot-data-sql-and-schema-sql<br>

https://github.com/snakefoot/snaketail-net/releases

<br><br>
Database versioning best practise:<br>
https://enterprisecraftsmanship.com/posts/database-versioning-best-practices/
<br><br><br
https://www.vogella.com/tutorials/JUnit/article.html
<br><br><br>


## running tests
  <br><br>
  All of the tests are run throuth eclipse´s built in j-unit test runner. simply run the tests from src/test/java/boxinator/BoxTest.java as a j-unit test.
