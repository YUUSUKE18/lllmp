import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        int target = Integer.parseInt(System.in);
        List<Integer> numbers = new ArrayList<>();
        int count = 0;

        for (String line : System.in.lines().skip(1).toArray(String[]::new)) {
            try {
                int number = Integer.parseInt(line);
                numbers.add(number);
                if (numbers.size() >= 2) {
                    for (int i = 0; i < numbers.size() - 1; i++) {
                        for (int j = i + 1; j < numbers.size(); j++) {
                            if (numbers.get(i) + numbers.get(j) == target) {
                                count++;
                            }
                        }
                    }
                }
            } catch (NumberFormatException e) {
                // Ignore invalid lines
            }
        }

        System.out.println("pairs=" + count);
    }
}
