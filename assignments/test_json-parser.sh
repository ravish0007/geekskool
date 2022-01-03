#!/bin/bash

rm -rf test test.zip
wget http://www.json.org/JSON_checker/test.zip 
unzip test.zip
chmod +x json-parser.js

ADDITONAL_TEST_DIR="testfiles_json"

test_dir() {
  DIR=$1
  for testfile in $(ls $DIR)
    do 
	    ./json-parser.js "$DIR/$testfile"
    done
}


test_dir test 
test_dir $ADDITONAL_TEST_DIR
