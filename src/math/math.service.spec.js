import chai from "chai";
import * as mathService from "./math.service";

chai.should();

describe("math.sum", () => {

  it("adds 2 numbers", () => {
    mathService.sum(1, 2).should.equal(3);
  });

});
