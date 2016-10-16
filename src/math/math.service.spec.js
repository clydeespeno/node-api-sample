import {should} from "chai";
import * as mathService from "./math.service";

should();

describe("math.sum", () => {

  it("adds 2 numbers", () => {
    mathService.sum(1, 2).should.equal(3);
  });

});
