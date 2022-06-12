package Api

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func Test(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Testing Suite")
}

var _ = Describe("Api", func() {

	BeforeEach(func() {

	})

	AfterEach(func() {

	})
	Describe("/login", func() {
		When("the username and password are correct", func() {
			It("should return a successful login response", func() {
			})
		})
		When("the username and password are incorrect", func() {
			It("should return a failed login response", func() {

			})
		})
	})
})
