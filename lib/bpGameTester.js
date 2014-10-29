//tester

function test_Libraries() {
QUnit.test( "Library Tests", function( assert ) {  
   assert.ok( ($===jQuery), 'jquery Loaded');
   assert.ok( bp.blah, 'bp loaded');   
  });//end library testing
}//end test_Libraries

function test_Load() {
  QUnit.test( "isGameSaved?", function (assert) {
    assert.equal(isGameSaved(), true, 'player 1 was found saved');
  });
}//end test Load

function test_Keys() {
  var k, i, letter, keyTrigger, catData =[], testData,
     keyupToTest = $.Event( 'keyup' ),     
     codes = [ 65, 68, 87, 32, 37, 38, 39, 40, 83 ]; //do some kinda for each keymap thing?

  for (k=0; k< codes.length; k++){
    keyupToTest.which = codes[k]; 
    keyupToTest.keyCode = codes[k]; //BOTH WHICH AND KEYCODE USED BECAUSE THE WORLD HATES ME
    keyTrigger = $(document).triggerHandler(keyupToTest);  
    letter = ($.hotkeys.specialKeys[codes[k].toString()]) || (String.fromCharCode(codes[k]).toLowerCase()); 
    testData = {'letter': letter, 'trigger': keyTrigger };
    catData.push(testData); 
  } //end for loop


  QUnit.test( "Key Tests", function( assert ) {  
    assert.ok($.hotkeys, 'jquery hotkeys loaded');
    for (i=0; i < catData.length; i++) { 
      
      assert.equal( (catData[i].letter + ' was released'), catData[i].trigger, ('tested ' + catData[i].letter + ' key'));
    }//end for  
  }); //end QUnit Test
  
} //end test_Keys

function test_Canvas() {
QUnit.test( "testing canvas", function( assert ) {  
          var expecter = 3;
          expect( expecter );
          for (var c = 0; c < expecter; c++){
            assert.ok( ctx[c], ('checked for canvas cv' + c));
          }//end loop
        }); //end canvas text
} //end test_Canvas