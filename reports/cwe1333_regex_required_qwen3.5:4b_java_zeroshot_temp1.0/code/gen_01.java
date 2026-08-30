public class Main {
    public static void main(String[] args) throws Exception {
        java.util.Scanner sc = new java.util.Scanner(System.in);
        int validCount = 0;
        String pattern = "^[ \\t]*(-?\\d+(?:[- ][-?]\\d+)*)(,-*|$)[ \\t]*$";
        
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (line.matches(pattern)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
