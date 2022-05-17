const { expect } = require('chai');
const { ethers, waffle} = require("hardhat");
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const RECEIVER_MAGIC_VALUE = '0x150b7a02';
const GAS_MAGIC_VALUE = 20000;

const Error = [ 'None', 'RevertWithMessage', 'RevertWithoutMessage', 'Panic' ]
  .reduce((acc, entry, idx) => Object.assign({ [entry]: idx }, acc), {});


describe('JRSVA', function () {

    var tokenId1 = 1;
    var tokenId2 = 2;
    var royalty = 100;
    var salePrice = 1000;
    var deployer = '8c0d28a69bebe72b609ee864ab296ccb63887d89f12f80741b1189b795352224' // Arii Dev

    beforeEach(async function () {

        // deploy contribution Token
        const nft = await ethers.getContractFactory("JRSVA");
        this.nftsc = await nft.deploy();
        await this.nftsc.deployed();

        this.startTokenId = 1;

        const receive = await ethers.getContractFactory("ERC721ReceiverMock");

        this.receiver = await receive.deploy(
            RECEIVER_MAGIC_VALUE, 
            Error.None 
        );
        await this.receiver.deployed();

        const accounts = await ethers.getSigners();
        this.owner = accounts[0];
        this.addr1 = accounts[1];
        this.addr2 = accounts[2];
        this.addr3 = accounts[3];

        this.buy_option = {value: ethers.utils.parseEther("0.18")}      
        this.receiver = new ethers.Wallet(deployer, waffle.provider)

        this.provider = waffle.provider

    });


    describe('EIP-165 support', async function () {
        
        it('supports IERC721', async function () {
          expect(await this.nftsc.supportsInterface('0x80ac58cd')).to.eq(true);
        })

        it('supports ERC721Metadata', async function () {
          expect(await this.nftsc.supportsInterface('0x5b5e139f')).to.eq(true);
        })

        it('support IERC2981', async function () {
            expect(await this.nftsc.supportsInterface('0x2a55205a')).to.eq(true);
        })

        it('does not support ERC721Enumerable', async function () {
          expect(await this.nftsc.supportsInterface('0x780e9d63')).to.eq(false);
        })

        it('does not support random interface', async function () {
          expect(await this.nftsc.supportsInterface('0x00000042')).to.eq(false);
        })
    })

    describe('with no minted tokens', async function () {
        it('has 0 totalSupply', async function () {
            expect(await this.nftsc.totalSupply()).to.equal(0);
        });
  
        it('has 0 totalMinted', async function () {
            expect(await this.nftsc.totalMinted()).to.equal(0);
        });
    });


    // describe('with minted tokens', async function () {
    //     beforeEach(async function () {
    //         const [owner, addr1, addr2, addr3] = await ethers.getSigners();
    //         this.owner = owner;
    //         this.addr1 = addr1;
    //         this.addr2 = addr2;
    //         this.addr3 = addr3;
    //         await this.nftsc.connect(this.addr1).mint(1);
    //         await this.nftsc.connect(this.addr2).mint(2);
    //         await this.nftsc.connect(this.addr3).mint(3);
    //     });

    //     describe('ERC721Metadata support', async function () {
    //         it('responds with the right name', async function () {
    //           expect(await this.nftsc.name()).to.eq('Jolly Rogers Society VIP');
    //         })
  
    //         it('responds with the right symbol', async function () {
    //           expect(await this.nftsc.symbol()).to.eq('JRSV');
    //         })
  
    //         it('sends an emtpy uri by default', async function () {
    //         const uri = await this.nftsc['tokenURI(uint256)'](1);
    //         expect(uri).to.eq('');
    //         })
  
    //         it('reverts when tokenid is invalid', async function () {
    //         await expect(this.nftsc['tokenURI(uint256)'](42)).to.be.reverted;
    //         })

    //     });

    //     describe('exists', async function () {
    //         it('verifies valid tokens', async function () {
    //           for (let tokenId = this.startTokenId; tokenId < 6 + this.startTokenId; tokenId++) {
    //             expect(await this.nftsc.exists(tokenId)).to.be.true;
    //           }
    //         });
  
    //         it('verifies invalid tokens', async function () {
    //           expect(await this.nftsc.exists(6 + this.startTokenId)).to.be.false;
    //         });
    //     });

    //     describe('balanceOf', async function () {
    //         it('returns the amount for a given address', async function () {
    //           expect(await this.nftsc.balanceOf(this.owner.address)).to.equal('0');
    //           expect(await this.nftsc.balanceOf(this.addr1.address)).to.equal('1');
    //           expect(await this.nftsc.balanceOf(this.addr2.address)).to.equal('2');
    //           expect(await this.nftsc.balanceOf(this.addr3.address)).to.equal('3');
    //         });
  
    //         it('throws an exception for the 0 address', async function () {
    //           await expect(this.nftsc.balanceOf(ZERO_ADDRESS)).to.be.revertedWith('BalanceQueryForZeroAddress');
    //         });
    //     });

    //     describe('_numberMinted', async function () {
    //         it('returns the amount for a given address', async function () {
    //           expect(await this.nftsc.numberMinted(this.owner.address)).to.equal('0');
    //           expect(await this.nftsc.numberMinted(this.addr1.address)).to.equal('1');
    //           expect(await this.nftsc.numberMinted(this.addr2.address)).to.equal('2');
    //           expect(await this.nftsc.numberMinted(this.addr3.address)).to.equal('3');
    //         });
    //     });

    //     describe('_totalMinted', async function () {
    //         it('has 6 totalMinted', async function () {
    //           const totalMinted = await this.nftsc.totalMinted();
    //           expect(totalMinted).to.equal('6');
    //         });
    //     });

    //     describe('aux', async function () {
    //         it('get and set works correctly', async function () {
    //           const uint64Max = '18446744073709551615';
    //           expect(await this.nftsc.getAux(this.owner.address)).to.equal('0');
    //           await this.nftsc.setAux(this.owner.address, uint64Max);
    //           expect(await this.nftsc.getAux(this.owner.address)).to.equal(uint64Max);
  
    //           expect(await this.nftsc.getAux(this.addr1.address)).to.equal('0');
    //           await this.nftsc.setAux(this.addr1.address, '1');
    //           expect(await this.nftsc.getAux(this.addr1.address)).to.equal('1');
  
    //           await this.nftsc.setAux(this.addr3.address, '5');
    //           expect(await this.nftsc.getAux(this.addr3.address)).to.equal('5');
  
    //           expect(await this.nftsc.getAux(this.addr1.address)).to.equal('1');
    //         });
    //     });

    //     describe('ownerOf', async function () {
    //         it('returns the right owner', async function () {
    //           expect(await this.nftsc.ownerOf(0 + this.startTokenId)).to.equal(this.addr1.address);
    //           expect(await this.nftsc.ownerOf(1 + this.startTokenId)).to.equal(this.addr2.address);
    //           expect(await this.nftsc.ownerOf(5 + this.startTokenId)).to.equal(this.addr3.address);
    //         });
  
    //         it('reverts for an invalid token', async function () {
    //           await expect(this.nftsc.ownerOf(10)).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //         });
    //     });


    //     describe('approve', async function () {
    //         beforeEach(function () {
    //             this.tokenId = this.startTokenId;
    //             this.tokenId2 = this.startTokenId + 1;
    //         });

    //         it('sets approval for the target address', async function () {
    //             await this.nftsc.connect(this.addr1).approve(this.addr2.address, this.tokenId);
    //             const approval = await this.nftsc.getApproved(this.tokenId);
    //             expect(approval).to.equal(this.addr2.address);
    //         });
    
    //         it('rejects an invalid token owner', async function () {
    //             await expect(
    //               this.nftsc.connect(this.addr1).approve(this.addr2.address, this.tokenId2)
    //             ).to.be.revertedWith('ApprovalToCurrentOwner');
    //         });
    
    //         it('rejects an unapproved caller', async function () {
    //             await expect(this.nftsc.approve(this.addr2.address, this.tokenId)).to.be.revertedWith(
    //               'ApprovalCallerNotOwnerNorApproved'
    //             );
    //         });
    
    //         it('does not get approved for invalid tokens', async function () {
    //             await expect(this.nftsc.getApproved(10)).to.be.revertedWith('ApprovalQueryForNonexistentToken');
    //         });
    //     });

    //     describe('setApprovalForAll', async function () {
    //         it('sets approval for all properly', async function () {
    //           const approvalTx = await this.nftsc.setApprovalForAll(this.addr1.address, true);
    //           await expect(approvalTx)
    //             .to.emit(this.nftsc, 'ApprovalForAll')
    //             .withArgs(this.owner.address, this.addr1.address, true);
    //           expect(await this.nftsc.isApprovedForAll(this.owner.address, this.addr1.address)).to.be.true;
    //         });
  
    //         it('sets rejects approvals for non msg senders', async function () {
    //           await expect(
    //             this.nftsc.connect(this.addr1).setApprovalForAll(this.addr1.address, true)
    //           ).to.be.revertedWith('ApproveToCaller');
    //         });
    //     });

    //     describe('test transfer functionality', function () {
            
    //         const testSuccessfulTransfer = function (transferFn) {
    //             beforeEach(async function () {
    //               this.tokenId = this.startTokenId + 1;
    
    //               const sender = this.addr2;
    //               this.from = sender.address;
    //               this.to = this.receiver.address;

    //               await this.nftsc.connect(sender).setApprovalForAll(this.to, true);
    //               this.transferTx = await this.nftsc.connect(sender)[transferFn](this.from, this.to, this.tokenId);
    //             });
    
    //             it('transfers the ownership of the given token ID to the given address', async function () {
    //               expect(await this.nftsc.ownerOf(this.tokenId)).to.be.equal(this.to);
    //             });
    
    //             it('emits a Transfer event', async function () {
    //               await expect(this.transferTx)
    //                 .to.emit(this.nftsc, 'Transfer')
    //                 .withArgs(this.from, this.to, this.tokenId);
    //             });
    
    //             it('clears the approval for the token ID', async function () {
    //               expect(await this.nftsc.getApproved(this.tokenId)).to.be.equal(ZERO_ADDRESS);
    //             });
    
    //             it('emits an Approval event', async function () {
    //               await expect(this.transferTx)
    //                 .to.emit(this.nftsc, 'Approval')
    //                 .withArgs(this.from, ZERO_ADDRESS, this.tokenId);
    //             });
    
    //             it('adjusts owners balances', async function () {
    //               expect(await this.nftsc.balanceOf(this.from)).to.be.equal(1);
    //             });
    //         };

    //         const testUnsuccessfulTransfer = function (transferFn) {
    //             beforeEach(function () {
    //               this.tokenId = this.startTokenId + 1;
    //             });
    
    //             it('rejects unapproved transfer', async function () {
    //               await expect(
    //                 this.nftsc.connect(this.addr1)[transferFn](this.addr2.address, this.addr1.address, this.tokenId)
    //               ).to.be.revertedWith('TransferCallerNotOwnerNorApproved');
    //             });
    
    //             it('rejects transfer from incorrect owner', async function () {
    //               await this.nftsc.connect(this.addr2).setApprovalForAll(this.addr1.address, true);
    //               await expect(
    //                 this.nftsc.connect(this.addr1)[transferFn](this.addr3.address, this.addr1.address, this.tokenId)
    //               ).to.be.revertedWith('TransferFromIncorrectOwner');
    //             });
    
    //             it('rejects transfer to zero address', async function () {
    //               await this.nftsc.connect(this.addr2).setApprovalForAll(this.addr1.address, true);
    //               await expect(
    //                 this.nftsc.connect(this.addr1)[transferFn](this.addr2.address, ZERO_ADDRESS, this.tokenId)
    //               ).to.be.revertedWith('TransferToZeroAddress');
    //             });
    //         };


    //         describe('successful transfers', function () {
                
    //             describe('transferFrom', function () {
    //                 testSuccessfulTransfer('transferFrom');
    //             });

    //             describe('safeTransferFrom', function () {
    //                 testSuccessfulTransfer('safeTransferFrom(address,address,uint256)');
      
    //                 // it('validates ERC721Received', async function () {
    //                 //   await expect(this.transferTx)
    //                 //     .to.emit(this.receiver, 'Received')
    //                 //     .withArgs(this.addr2.address, this.addr2.address, 1 + this.startTokenId, '0x', GAS_MAGIC_VALUE);
    //                 // });
    //             });

    //         });

    //         describe('unsuccessful transfers', function () {
                
    //             describe('transferFrom', function () {
    //               testUnsuccessfulTransfer('transferFrom');
    //             });
    
    //             describe('safeTransferFrom', function () {
    //               testUnsuccessfulTransfer('safeTransferFrom(address,address,uint256)');
    //             });
    //         });

    //         describe('_burn', async function() {
    //             beforeEach(function () {
    //               this.tokenIdToBurn = this.startTokenId;
    //             });
      
    //             it('revert if approvalCheck is true', async function () {
    //               await expect(
    //                 this.nftsc.connect(this.addr2).burn(this.tokenIdToBurn)
    //               ).to.be.revertedWith('TransferCallerNotOwnerNorApproved');
    //             });
    //         });
    //     });
    // });

    // describe('burnable test', async function () {
    //     beforeEach(async function () {

    //         const [owner, addr1, addr2, spender] = await ethers.getSigners();
    //         this.owner = owner;
    //         this.addr1 = addr1;
    //         this.addr2 = addr2;
    //         this.spender = spender;
    //         this.numTestTokens = 10;
    //         this.burnedTokenId = 5;
    //         this.notBurnedTokenId = 6;
    //         await this.nftsc.connect(this.addr1).mint(this.numTestTokens);
    //         await this.nftsc.connect(this.addr1).burn(this.burnedTokenId);
    //     });

    //     describe('totalSupply()', function () {
    //         it('has the expected value', async function () {
    //           expect(await this.nftsc.totalSupply()).to.equal(9);
    //         });
    
    //         it('is reduced by burns', async function () {
    //           const supplyBefore = await this.nftsc.totalSupply();
    
    //           for (let i = 0; i < 2 + this.startTokenId; ++i) {
    //             await this.nftsc.connect(this.addr1).burn(i + this.startTokenId);
    
    //             const supplyNow = await this.nftsc.totalSupply();
    //             expect(supplyNow).to.equal(supplyBefore - (i + 1));
    //           }
    //         });

    //         it('changes exists', async function () {
    //             expect(await this.nftsc.exists(this.burnedTokenId)).to.be.false;
    //             expect(await this.nftsc.exists(this.notBurnedTokenId)).to.be.true;
    //         });

    //         it('cannot burn a non-existing token', async function () {
    //             const query = this.nftsc.connect(this.addr1).burn(this.numTestTokens + this.startTokenId);
    //             await expect(query).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //         });

    //         it('cannot burn a burned token', async function () {
    //             const query = this.nftsc.connect(this.addr1).burn(this.burnedTokenId);
    //             await expect(query).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //         });

    //         it('cannot burn with wrong caller or spender', async function () {
    //             const tokenIdToBurn = this.notBurnedTokenId;
                
    //             // sanity check
    //             await this.nftsc.connect(this.addr1).approve(ZERO_ADDRESS, tokenIdToBurn);
    //             await this.nftsc.connect(this.addr1).setApprovalForAll(this.spender.address, false);

    //             const query = this.nftsc.connect(this.spender).burn(tokenIdToBurn);
    //             await expect(query).to.be.revertedWith('TransferCallerNotOwnerNorApproved');
    //         });

    //         it('spender can burn with specific approved tokenId', async function () {
    //             const tokenIdToBurn = this.notBurnedTokenId;

    //             await this.nftsc.connect(this.addr1).approve(this.spender.address, tokenIdToBurn);
    //             await this.nftsc.connect(this.spender).burn(tokenIdToBurn);
    //             expect(await this.nftsc.exists(tokenIdToBurn)).to.be.false;
    //         });

    //         it('spender can burn with one-time approval', async function () {
    //             const tokenIdToBurn = this.notBurnedTokenId;

    //             await this.nftsc.connect(this.addr1).setApprovalForAll(this.spender.address, true);
    //             await this.nftsc.connect(this.spender).burn(tokenIdToBurn);
    //             expect(await this.nftsc.exists(tokenIdToBurn)).to.be.false;
    //         });

    //         it('cannot transfer a burned token', async function () {
    //             const query = this.nftsc
    //             .connect(this.addr1)
    //             .transferFrom(this.addr1.address, this.addr2.address, this.burnedTokenId);
    //             await expect(query).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //         });

    //         it('does not affect _totalMinted', async function () {
    //             const totalMintedBefore = await this.nftsc.totalMinted();
    //             expect(totalMintedBefore).to.equal(this.numTestTokens);
    //             for (let i = 0; i < 2; ++i) {
    //             await this.nftsc.connect(this.addr1).burn(i + this.startTokenId);
    //             }
    //             expect(await this.nftsc.totalMinted()).to.equal(totalMintedBefore);
    //         });

    //         it('adjusts owners balances', async function () {
    //             expect(await this.nftsc.balanceOf(this.addr1.address)).to.be.equal(this.numTestTokens - 1);
    //         });

    //     });

    //     describe('ownerships correctly set', async function () {
    //         it('with token before previously burnt token transferred and burned', async function () {
    //             const tokenIdToBurn = this.burnedTokenId - 1;
    //             await this.nftsc
    //               .connect(this.addr1)
    //               .transferFrom(this.addr1.address, this.addr2.address, tokenIdToBurn);
    //             expect(await this.nftsc.ownerOf(tokenIdToBurn)).to.be.equal(this.addr2.address);
    //             await this.nftsc.connect(this.addr2).burn(tokenIdToBurn);
    //             for (let i = this.startTokenId; i < this.numTestTokens + this.startTokenId; ++i) {
    //               if (i == tokenIdToBurn || i == this.burnedTokenId) {
    //                 await expect(this.nftsc.ownerOf(i)).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //               } else {
    //                 expect(await this.nftsc.ownerOf(i)).to.be.equal(this.addr1.address);
    //               }
    //             }
    //           });
      
    //           it('with token after previously burnt token transferred and burned', async function () {
    //             const tokenIdToBurn = this.burnedTokenId + 1;
    //             await this.nftsc
    //               .connect(this.addr1)
    //               .transferFrom(this.addr1.address, this.addr2.address, tokenIdToBurn);
    //             expect(await this.nftsc.ownerOf(tokenIdToBurn)).to.be.equal(this.addr2.address);
    //             await this.nftsc.connect(this.addr2).burn(tokenIdToBurn);
    //             for (let i = this.startTokenId; i < this.numTestTokens + this.startTokenId; ++i) {
    //               if (i == tokenIdToBurn || i == this.burnedTokenId) {
    //                 await expect(this.nftsc.ownerOf(i)).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //               } else {
    //                 expect(await this.nftsc.ownerOf(i)).to.be.equal(this.addr1.address);
    //               }
    //             }
    //           });
      
    //           it('with first token burned', async function () {
    //             await this.nftsc.connect(this.addr1).burn(this.startTokenId);
    //             for (let i = this.startTokenId; i < this.numTestTokens + this.startTokenId; ++i) {
    //               if (i == this.startTokenId || i == this.burnedTokenId) {
    //                 await expect(this.nftsc.ownerOf(i)).to.be.revertedWith('OwnerQueryForNonexistentToken');
    //               } else {
    //                 expect(await this.nftsc.ownerOf(i)).to.be.equal(this.addr1.address);
    //               }
    //             }
    //           });
      
    //           it('with last token burned', async function () {
    //             await expect(this.nftsc.ownerOf(this.numTestTokens + this.startTokenId)).to.be.revertedWith(
    //               'OwnerQueryForNonexistentToken'
    //             );
    //             await this.nftsc.connect(this.addr1).burn(this.numTestTokens - 1 + this.startTokenId);
    //             await expect(this.nftsc.ownerOf(this.numTestTokens - 1 + this.startTokenId)).to.be.revertedWith(
    //               'OwnerQueryForNonexistentToken'
    //             );
    //           });
    //     });
    // });

    describe('royalties', async function () {
        beforeEach(async function () {
            const [account1, account2] = await ethers.getSigners();

            await this.nftsc.connect(account1).mint(2);

            this.account1 = account1;
            this.account2 = account2;
            this.tokenId1 = tokenId1;
            this.tokenId2 = tokenId2;
            this.salePrice = salePrice;

            this.royaltyFraction = 100;


        });

        describe('default royalty', function () {
            
            it('checks royalty is set', async function () {
                const initInfo = await this.nftsc.royaltyInfo(this.tokenId1, this.salePrice);
                expect(initInfo[0]).to.be.equal(ZERO_ADDRESS);
                expect(initInfo[1].toString()).to.be.bignumber.equal(new BN(0));
            });


            it('updates royalty amount', async function () {
                const newPercentage = 25;
          
                // Updated royalty check
                await this.nftsc.setRoyaltyInfo(this.account1.address, newPercentage);
                const royalty = new BN((this.salePrice * newPercentage) / 10000);
                const newInfo = await this.nftsc.royaltyInfo(this.tokenId1, this.salePrice);
          
                expect(newInfo[0]).to.be.equal(this.account1.address);
                expect(newInfo[1].toString()).to.be.bignumber.equal(royalty);
              });
          
              it('holds same royalty value for different tokens', async function () {
                const newPercentage = 20;
                await this.nftsc.setRoyaltyInfo(this.account1.address, newPercentage);
          
                const token1Info = await this.nftsc.royaltyInfo(this.tokenId1, this.salePrice);
                const token2Info = await this.nftsc.royaltyInfo(this.tokenId2, this.salePrice);
          
                expect(token1Info[1].toString()).to.be.bignumber.equal(token2Info[1].toString());
              });
          
              it('Remove royalty information', async function () {
                const newValue = 0;
                await this.nftsc.deleteDefaultRoyalty();
          
                const token1Info = await this.nftsc.royaltyInfo(this.tokenId1, this.salePrice);
                const token2Info = await this.nftsc.royaltyInfo(this.tokenId2, this.salePrice);
                
                // Test royalty info is still persistent across all tokens
                expect(token1Info[0].toString()).to.be.bignumber.equal(token2Info[0].toString());
                expect(token1Info[1].toString()).to.be.bignumber.equal(token2Info[1].toString());
                
                // Test information was deleted
                expect(token1Info[0]).to.be.equal(ZERO_ADDRESS);
                expect(token1Info[1].toString()).to.be.bignumber.equal(newValue.toString());
              });
          
              it('reverts if invalid parameters', async function () {

                await expectRevert(
                  this.nftsc.setRoyaltyInfo(ZERO_ADDRESS, this.royaltyFraction),
                  'ERC2981: invalid receiver',
                );

              });
        });
    
    });

    describe('JRS VIP specificities', async function () {
        
        describe('State Variables', function () {
          it('State variables', async function () {
              expect(await this.nftsc.pause()).to.be.equal(false);
              expect(await this.nftsc._max()).to.be.equal(88);
              expect(await this.nftsc.contractURI()).to.be.equal('');
              expect(await this.nftsc.totalSupply()).to.be.equal(0);
              expect((await this.nftsc._price()).toString()).to.be.equal('180000000000000000');
          });
        });

        describe('Payment Verification', function() {
          it('Mint Payment', async function () {
              await this.nftsc.connect(this.addr1).mint(this.buy_option);
              expect((await this.provider.getBalance(this.receiver.address)).toString()).to.be.equal('180000000000000000');
          });

          it('Payment Not Correct', async function () {
            await expectRevert(this.nftsc.connect(this.addr1).mint({value: ethers.utils.parseEther("0.15")}), 'Ether value sent is not correct')
            await expectRevert(this.nftsc.connect(this.addr1).mint({value: ethers.utils.parseEther("0")}), 'Ether value sent is not correct')
            await expectRevert(this.nftsc.connect(this.addr1).mint({value: ethers.utils.parseEther("0.2")}), 'Ether value sent is not correct')
          });
        });

        describe('Minting and Burning implementation', function() {

            it('new unique mint', async function () {
                await this.nftsc.connect(this.addr1).mint(this.buy_option);
                expect(await this.nftsc.totalSupply()).to.be.equal(1);
            });

            it('new multiple mint', async function () {
                await this.nftsc.connect(this.addr1).mint(this.buy_option);
                await this.nftsc.connect(this.addr3).mint(this.buy_option);
                expect(await this.nftsc.totalSupply()).to.be.equal(2);
            });

            it('max mint revert', async function () {
              const all_accounts = await ethers.getSigners();
              for (i in all_accounts) {
                if (i < 88){
                  await this.nftsc.connect(all_accounts[i]).mint(this.buy_option)
                }
              }

              await expectRevert(
                  this.nftsc.connect(all_accounts[88]).mint(this.buy_option),
                  'Max VIP Mint Reached',
              );
            });

            it('max mint revert - multiple holders ', async function () {

                await this.nftsc.connect(this.addr1).mint(this.buy_option);

                await expectRevert(
                  this.nftsc.connect(this.addr1).mint(this.buy_option),
                    'Max VIP is 1',
                );
            });

        });

        // describe('Token URI implementation', function() {
            
        //     it('uri revert - only owner ', async function () {
        //         await expectRevert(
        //             this.nftsc.connect(this.addr2).setTokenURI(1, '1'),
        //             'Ownable: caller is not the owner',
        //         );
        //     });

        //     it('revert when token non existent', async function () {
        //         await this.nftsc.connect(this.owner).setTokenURI(1, '1');   
        //         await expectRevert(
        //             this.nftsc.tokenURI(1),
        //             'ERC721URIStorage: URI query for nonexistent token',
        //         );
        //     });

        //     it('set token URI to id 1', async function () {
        //         await this.nftsc.connect(this.addr1).mint(1);
        //         await this.nftsc.connect(this.owner).setTokenURI(1, '1');   
        //         expect(await this.nftsc.tokenURI(1)).to.be.equal('1');
        //     });

        //     it('set token URI to id 1', async function () {
        //         await this.nftsc.connect(this.addr1).mint(5);

        //         const allIds = [1,2,3,4,5]
        //         const allURIs = ['1', '2', '3', '4', '5']

        //         await this.nftsc.connect(this.owner).setMultipleTokenURI(allIds, allURIs);

        //         expect(await this.nftsc.tokenURI(5)).to.be.equal('5');
        //     });

        // });

    });


});

